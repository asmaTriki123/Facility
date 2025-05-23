import { Op } from "sequelize";
import { UniqueIdUser } from "../middleware/UniqueIdUser";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { Company } from "../models/Company";
import Authentication from "../utils/Authentication";
import { DeleteAncienImage } from "../middleware/DeleteAncienImage";



// import nodemailer from 'nodemailer';
// import Authentication from "../utils/Authentication";
// import { Reservation } from "../model/Reservation";
interface IUserRepo {
  save(user: User): Promise<User>;
  update(user: User): Promise<void>;
  retrievePermissions(userEmail: string): Promise<String[]>
  // delete(userId: number): Promise<void>;
  retrieveById(userId: any): Promise<User>;
  // retrieveAll(): Promise<User[]>;
  forgetPassword(user: User): Promise<User>
  findByIdentifier(userIdentifier: string): Promise<User>;
  ActiverDesactiverRepo(userId: string): Promise<User>

}
export class UserRepo implements IUserRepo {
  async save(user: User): Promise<User> {
    console.log("user", user);
    try {
      const userId = await new UniqueIdUser().generateUniqueId();
      console.log('userPassword', user.userPassword);
      const hashedPassword: string = await Authentication.passwordHash(user.userPassword)
      const userPhoto = user.userPhoto || 'user2.PNG';
      const userDriverUrl = user.userDriverUrl || 'driverlicence.PNG';

      const new_user = await User.create({

        userId: userId,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userEmail: user.userEmail,
        userPassword: hashedPassword,
        userCellPhone: user.userCellPhone,
        userType: user.userType,
        userEmailInfo: user.userEmailInfo,
        userAdress1: user.userAdress1,
        userAdress2: user.userAdress2,
        userPhoneNumber: user.userPhoneNumber,
        userPostalCode: user.userPostalCode,
        userDriverLicense: user.userDriverLicense,
        //userDriverUrl: user.userDriverUrl,
        userDriverUrl: userDriverUrl,
        userIsActive: false,
        userSmsOptIn: user.userSmsOptIn,
        userNewsletterOptIn: user.userNewsletterOptIn,
        userIsVerified: false,
        //userPhoto: user.userPhoto,
        userPhoto: userPhoto,
        userNotes: user.userNotes,
        userCountry: user.userCountry,
        userGender: user.userGender,
        userCity: user.userCity,
        LastLogin: user.LastLogin,
        createdBy: user.createdBy,
        userState: user.userState,

        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        companyId: user.companyId,

      }, { returning: true });

      return new_user;
    } catch (error) {
      throw new Error("Failed to create user! " + error);
    }
  }

  async findByIdentifier(userIdentifier: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { userEmail: userIdentifier },
            { userCellPhone: userIdentifier }
          ]
        }
      });
      console.log("user")
      if (!user) {
        throw new Error("User not found!");
      }
      return user;
    }
    catch (error) {
      throw new Error("Failed to find  user by email or phone !" + error);

    }
  }
  async checkEmailorPhone(userIdentifier: string): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { userEmail: userIdentifier },
            { userCellPhone: userIdentifier }
          ]
        }
      });
      return user || null;
    }
    catch (error) {
      throw new Error("Failed to find  user by email or phone !" + error);

    }
  }
  /*async update(user: User): Promise<void> {
    try {
      const new_user = await User.findOne({
        where: {
          userId: user.userId,
        },
      });
      if (!new_user) {
        throw new Error("User not found!");
      }
      console.log('userId', new_user.userId)
      console.log('userUpdate', user)

      new_user.userFirstName = user.userFirstName;
      new_user.userLastName = user.userLastName;
      new_user.userEmail = user.userEmail;
      new_user.userPassword = user.userPassword;
      new_user.userCellPhone = user.userCellPhone;
      new_user.updatedBy = user.updatedBy;
      new_user.updatedAt = new Date();
      await new_user.save();
    } catch (error) {
      throw new Error("Failed to update user!" + error);
    }
  }*/


  //hathi t5dem
  /*
  async update(user: User): Promise<void> {
      try {
          // Récupérer l'utilisateur existant
          const existingUser = await User.findOne({
              where: {
                  userId: user.userId,
              },
          });
  
          if (!existingUser) {
              throw new Error("User not found!");
          }
  
          // Mettre à jour les champs de l'utilisateur
          existingUser.userFirstName = user.userFirstName;
          existingUser.userLastName = user.userLastName;
          existingUser.userEmail = user.userEmail;
          existingUser.userAdress1 = user.userAdress1;
          existingUser.userAdress2 = user.userAdress2;
          existingUser.userCellPhone = user.userCellPhone;
          existingUser.userCity = user.userCity;
          existingUser.userCountry = user.userCountry;
          existingUser.userEmailInfo = user.userEmailInfo;
          existingUser.userGender = user.userGender;
          existingUser.userState = user.userState;
          existingUser.userNewsletterOptIn = user.userNewsletterOptIn;
          existingUser.userSmsOptIn = user.userSmsOptIn;
          existingUser.userPostalCode = user.userPostalCode;
          existingUser.userType = user.userType;
          existingUser.userDriverUrl = user.userDriverUrl;
          existingUser.userNotes = user.userNotes;
          existingUser.userPhoneNumber = user.userPhoneNumber;
          existingUser.userPhoto = user.userPhoto;
          existingUser.updatedBy = user.updatedBy;
          existingUser.updatedAt = new Date();
          // Sauvegarder les modifications
          await existingUser.save();
      } catch (error) {
          throw new Error("Failed to update user: " + error);
      }
  }
  
  */


  async update(user: User): Promise<void> {
    try {
      console.log("user to update ", user)
      // Récupérer l'utilisateur existant
      const existingUser = await User.findOne({
        where: { userId: user.userId },
      });

      if (!existingUser) {
        throw new Error("User not found!");
      }

      // Vérifier si l'email a été modifié et existe déjà pour un autre utilisateur
      if (user.userEmail && user.userEmail !== existingUser.userEmail) {
        const userWithSameEmail = await User.findOne({
          where: {
            userEmail: user.userEmail,
            userId: { [Op.not]: user.userId }, // Exclure l'utilisateur actuel
          },
        });

        if (userWithSameEmail) {
          throw new Error("Email already exists for another user!");
        }
      }

      // Vérifier si le numéro de téléphone a été modifié et existe déjà pour un autre utilisateur
      if (user.userCellPhone && user.userCellPhone !== existingUser.userCellPhone) {
        const userWithSamePhone = await User.findOne({
          where: {
            userCellPhone: user.userCellPhone,
            userId: { [Op.not]: user.userId }, // Exclure l'utilisateur actuel
          },
        });

        if (userWithSamePhone) {
          throw new Error("Cell phone number already exists for another user!");
        }
      }
      
      const deleteImageHelper = new DeleteAncienImage();
console.log("avant delete")
      // Suppression de l’ancienne image utilisateur si besoin
      if(!user.userDriverUrl?.includes("/uploads") )
      {
        await deleteImageHelper.deleteOldImageIfNeeded(user?.userDriverUrl, existingUser.userDriverUrl, ["driverlicence.PNG"]);

      }
      if(!user.userPhoto?.includes("/uploads"))
      {
      await deleteImageHelper.deleteOldImageIfNeeded(user?.userPhoto, existingUser.userPhoto, ["user2.png"]);
      }
      // Suppression de l’ancien permis si besoin
      console.log("apres  delete")


      // Mettre à jour les champs modifiés uniquement
      existingUser.userFirstName = user.userFirstName;
      existingUser.userLastName = user.userLastName;
      existingUser.userEmail = user.userEmail;
      existingUser.userAdress1 = user.userAdress1;
      existingUser.userAdress2 = user.userAdress2;
      existingUser.userCellPhone = user.userCellPhone;
      existingUser.userCity = user.userCity;
      existingUser.userCountry = user.userCountry;
      existingUser.userEmailInfo = user.userEmailInfo;
      existingUser.userGender = user.userGender;
      existingUser.userState = user.userState;
      existingUser.userNewsletterOptIn = user.userNewsletterOptIn;
      existingUser.userSmsOptIn = user.userSmsOptIn;
      existingUser.userPostalCode = user.userPostalCode;
      existingUser.userType = user.userType;

      existingUser.userDriverUrl = user.userDriverUrl?.includes("/uploads") ? existingUser.userDriverUrl : user.userDriverUrl;
      existingUser.userNotes = user.userNotes;
      existingUser.userPhoneNumber = user.userPhoneNumber;
      existingUser.userPhoto = user.userPhoto?.includes("/uploads") ? existingUser.userPhoto : user.userPhoto;
      existingUser.updatedBy = user.updatedBy;
      existingUser.updatedAt = new Date();

      // Sauvegarder les modifications
      await existingUser.save();
    } catch (error) {
      throw new Error("Failed to update user: " + error);

    }
  }


  async forgetPassword(user: User): Promise<User> {
    try {
      console.log("userEmail", user.userEmail)
      const new_user = await User.findOne({
        where: {
          userEmail: user.userEmail,
        },
      });
      console.log("userEmail", new_user)
      if (!new_user) {
        throw new Error("User not found!");
      }
      new_user.userPassword = user.userPassword;
      new_user.updatedBy = new_user.userId;
      new_user.updatedAt = new Date()
      await new_user.save();
      return new_user;
    } catch (error) {
      throw new Error("Failed to update password user!" + error);
    }
  }
  //   async delete(userId: number): Promise<void> {
  //     try {
  //       const new_user = await User.findOne({
  //         where: {
  //           userId: userId,
  //         },
  //       });
  //       if (!new_user) {
  //         throw new Error("User not found!");
  //       }
  //       new_user.isDeleted = 1;
  //       await new_user.save();
  //       console.log(`type with id ${userId} has been soft deleted.`);

  //     } catch (error) {
  //       throw new Error("Failed to create user!"+error);
  //     }
  //   }

  async retrieveById(userId: string): Promise<User> {
    try {
      console.log('userId', userId)
      const new_user = await User.findOne({
        where: { userId: userId, isDeleted: false },
      });

      if (!new_user) {
        throw new Error(`User not found with ID ${userId}`);
      }

      return new_user;
    } catch (error) {
      console.error("Error in retrieveById:", error);
      throw new Error("Failed to retrieve user! " + error);
    }
  }


  async retrievePermissions(userEmail: string): Promise<String[]> {
    try {
      const user = await User.findOne({
        where: { userEmail: userEmail },
        include: [
          {
            model: Role,
            include: [
              {
                model: Permission,
                attributes: ['permissionLink'], // Récupère uniquement l'attribut 'link' de la table Permission
                through: { attributes: [] }, // Exclut les colonnes de la table de liaison
              },
            ],
          },
        ],
      });

      if (!user) {
        throw new Error("User not found!");
      }
      const permissions = user.role?.permissions?.map((p) => p.permissionLink) || [];
      return permissions;
    } catch (error) {
      console.error("Error in retrieveByEmail:", error);
      throw error;
    }
  }
  //   async retrieveAll(): Promise<User[]> {
  //     try {
  //       return await User.findAll();
  //     } catch (error) {
  //       throw new Error("Failed to fin all user!"+error);
  //     }
  //   }


  async retrieveAllUser(): Promise<User[]> {

    try {
      const user = await User.findAll({
        where: {
          isDeleted: false, userType: {
            [Op.notIn]: ["admin", "customer"] // Récupère les users dont userType n'est PAS Admin ou customer
          }
        },
        include: [Role]
      });

      return user;
    }
    catch (error) {
      throw new Error("Failed to find  users !" + error);

    }
  }


  async ActiverDesactiverRepo(userId: string): Promise<User> {
    const user = await User.findOne({
      where: { userId, isDeleted: false },
      include: [Company]
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Vérification seulement pour l'activation
    if (!user.userIsActive && (!user.company || !user.company.companyIsActive)) {
      throw new Error("Impossible d'activer: la compagnie est inactive");
    }

    user.userIsActive = !user.userIsActive;
    await user.save();
    return user;
  }
 

async  updateUserActivationStatus(userEmail: string, userIsActive: boolean): Promise<User | null> {
    try {
        // Cherche l'utilisateur dans la base
        const user = await User.findOne({ where: { userEmail } });

        if (!user) {
            return null; // utilisateur non trouvé
        }

        // Met à jour le champ d'activation
        user.userIsActive = userIsActive;

        // Sauvegarde dans la base
        await user.save();

        return user;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        throw error;
    }
  }

}
