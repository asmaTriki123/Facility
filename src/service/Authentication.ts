import { UserRepo } from "../repositoryBackOffice/UserRepo";
import Authentication from "../utils/Authentication";

import { RoleRepo } from "../repositoryBackOffice/RoleRepo";
import { CompanyRepo } from "../repositoryBackOffice/CompanyRepo";
interface IAuthentificationService {
  login(userIdentifier: string, userPassword: string): Promise<string>;
}
export class AuthenticationService implements IAuthentificationService {
  async login(userIdentifier: string, userPassword: string): Promise<string> {
    
    const users = await new UserRepo().findByIdentifier(userIdentifier);
    if (!users) {
      throw new Error("Bad Request");
    }
if (!users.userIsActive) {
  const error: any = new Error("Votre compte est désactivé. Veuillez contacter l'administrateur.");
  error.status = 403;
  error.userIsActive = false;
  throw error;
}

    let compare = await Authentication.passwordCompare(
      userPassword,
      users.userPassword
    );
    console.log("comppare",compare)
    if (compare) {
      console.log('users',users)
      const role=await new RoleRepo().retrieveById(users.roleId)
      const company=await new CompanyRepo().retrieveById(users.companyId)
      console.log('role',role)
      return Authentication.generateToken(
        users.userEmail,
        role.roleName,
        users.userId,
        users.userType,
        users.userCellPhone ,
        company.companyId,
        users.userPhoto
     
      );
    }
    return "";
 
  
  }
 
}