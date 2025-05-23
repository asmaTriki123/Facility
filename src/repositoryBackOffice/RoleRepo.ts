import { Role } from "../models/Role";
import { User } from "../models/User";
interface IRoleRepo {
  // save(role: Role): Promise<Role>;
  // update(role: Role): Promise<void>;
  // delete(idRole: number): Promise<void>;
    retrieveById(idRole: number): Promise<Role>;
  // retrieveAll(): Promise<Role[]>;
  // countUsersByIdRole(roleId: number): Promise<number> 

}
export class RoleRepo implements IRoleRepo {
  async retrieveById(roleId: number): Promise<Role> {
    try {
      const new_role = await Role.findOne({
        where: {
          roleId: roleId,
        },
      });
      if (!new_role) {
        throw new Error("Role not found!");
      }
      return new_role;
    } catch (error) {
      throw new Error("Failed to find  role by id!"+error);
    }
  }
// async save(role: Role): Promise<Role> {
//   try {
//     const savedRole = await Role.create({
//       roleNom: role.roleNom,
//       createdBy: role.createdBy,
//       updatedBy: role.updatedBy,
//     });
//     return savedRole; // Return the saved Role object
//   } catch (error) {
//     throw new Error("Failed to create role!" + error);
//   }
// }

//   async update(role: Role): Promise<void> {
//     try {
//       const new_role = await Role.findOne({
//         where: {
//           id_role: role.id,
//         },
//       });
//       if (!new_role) {
//         throw new Error("Permission not found!");
//       }
//         (new_role.roleNom = role.roleNom),
//         (new_role.updatedBy = role.updatedBy),
//         await new_role.save();
//     } catch (error) {
//       throw new Error("Failed to update role!"+error);
//     }
//   }
//   async delete(roleId: number): Promise<void> {
//     try {
//       console.log(roleId)
//       const new_role = await Role.findOne({
//         where: {
//           id_role: roleId,
//         },
//       });
//       if (!new_role) {
//         throw new Error("Role not found!");
//       }
//       new_role.isDeleted = 1;
//       await new_role.save();
//       console.log(`type with id ${roleId} has been soft deleted.`);
//     } catch (error) {
//       throw new Error("Failed to delete role!"+error);
//     }
//   }

 
//   async retrieveAll(): Promise<Role[]> {
//     try {
//       return await Role.findAll();
//     } catch (error) {
//       throw new Error("Failed to getAll role!"+error);
//     }
//   }
//   async countUsersByIdRole(roleId: number): Promise<number> {
//     try {
//       return await User.count({
//         where: {
//           roleId: roleId,
//           isDeleted: 0
//         },
//       });
//     } catch (error) {
//       throw new Error(`Failed to count sous-domaines for roleId ${roleId}: ${error}`);
//     }
//   }


}
