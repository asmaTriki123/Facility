import { Request, Response } from "express";
import { Role } from "../models/Role";
import { RoleRepo } from "../repositoryBackOffice/RoleRepo";
class RoleController {
//   async create(req: Request, res: Response) {
//     console.log( req.body)
//     try {
//       const new_role = new Role();
//       new_role.roleNom = req.body.roleNom;
//       new_role.createdBy = req.body.userId;
//       const savedRole = await new RoleRepo().save(new_role);
//       res.status(201).json({
//         status: "Created! ",
//         message: "Successfully created role!",
//         data: savedRole, // Include the savedRole data in the response
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error! ",
//         message: "Internal Server Error!"+err,
//       });
//     }
//   }
//   async delete(req: Request, res: Response) {
//     try {
//       let id = parseInt(req.params["id"]);
//       await new RoleRepo().delete(id);
// const roleRepo = new RoleRepo();

//       // Vérifier si le Role est référencé par des utilisateurs
//       const userCount = await roleRepo.countUsersByIdRole(id);
//       if (userCount > 0) {
//         res.status(500).json({
//           status: "Error!",
//           message: `Impossible de supprimer le Role avec ID ${id}. ` +
//             `Il est référencé par ${userCount} Utilisateur(s). Veuillez les supprimer d'abord.`,
//         });
//       } else {
//       res.status(200).json({
//         status: "Ok! ",
//         message: "Successfully deleted role!",
//       });
//     } 
//   }catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error! ",
//         message: "Internal Server Error!"+err,
//       });
//     }
//   }
//   async findById(req: Request, res: Response) {
//     try {
//       let id = parseInt(req.params["id"]);
//       const new_role = await new RoleRepo().retrieveById(id);
//       res.status(200).json({
//         status: "Ok! ",
//         message: "Successfully fetched role by id!",
//         data: new_role,
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error! ",
//         message: "Internal Server Error!"+err,
//       });
//     }
//   }
//   async findAll(req: Request, res: Response) {
//     try {
//       const new_role = await new RoleRepo().retrieveAll();
//       res.status(200).json({
//         status: "Ok! ",
//         message: "Successfully fetched all role data!",
//         data: new_role,
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error! ",
//         message: "Internal Server Error!"+err,
//       });
//     }
//   }
  
//   async update(req: Request, res: Response) {
//     try {
//       let id = parseInt(req.params["id"]);
//       const new_role = new Role();
//       new_role.id = id;
//       new_role.roleNom = req.body.roleNom;
//       new_role.updatedBy = req.body.updatedBy;
//       await new RoleRepo().update(new_role);
//       res.status(200).json({
//         status: "Ok! ",
//         message: "Successfully updated role data!",
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error! ",
//         message: "Internal Server Error!"+err,
//       });
//     }
//   }
}
export default new RoleController();
