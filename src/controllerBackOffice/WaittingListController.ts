import { Request, Response } from "express";
import { WaittingList } from "../models/WaittingList";
import { WaittingListRepo } from "../repositoryBackOffice/WaittingListRepo";
import { AuthenticationService } from "../service/Authentication";
import Authentication from "../utils/Authentication";
class WaittingListController {
  async createWattingUser(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      // Extract files from the request
      const files = req.files as {
        userPhoto?: Express.Multer.File[],
        userDriverUrl?: Express.Multer.File[]
      };

      // Construct the new user object
      const new_wattingList = new WaittingList();
      new_wattingList.roleId = req.body.roleId;
      
      new_wattingList.userEmail = req.body.userEmail;
      new_wattingList.userPassword = req.body.userPassword;  // Will hash later
      new_wattingList.userFirstName = req.body.userFirstName;
      new_wattingList.userLastName = req.body.userLastName;
      new_wattingList.userCellPhone = req.body.userCellPhone;
      new_wattingList.userType = req.body.userType;
      new_wattingList.userEmailInfo = req.body.userEmailInfo;
      new_wattingList.userAdress1 = req.body.userAdress1;
      new_wattingList.userAdress2 = req.body.userAdress2;
      new_wattingList.userPhoneNumber = req.body.userPhoneNumber;
      new_wattingList.userPostalCode = req.body.userPostalCode;
      new_wattingList.userDriverLicense = req.body.userDriverLicense;
      new_wattingList.userSmsOptIn = req.body.userSmsOptIn;
      new_wattingList.userNewsletterOptIn = req.body.userNewsletterOptIn;
      new_wattingList.userDriverUrl = files.userDriverUrl?.[0]?.filename || null;
      new_wattingList.userPhoto = files.userPhoto?.[0]?.filename || null;
      new_wattingList.userNotes = req.body.userNotes;
      new_wattingList.userCountry = req.body.userCountry;
      new_wattingList.userGender = req.body.userGender;
      new_wattingList.userState = req.body.userState;
      new_wattingList.userCity = req.body.userCity;
      new_wattingList.LastLogin = req.body.LastLogin;
      new_wattingList.createdBy = req.body.createdBy || null;
      new_wattingList.rentMoveIn = req.body.rentMoveIn;
      new_wattingList.typeUnitId = req.body.typeUnitId;
      new_wattingList.facilityId = req.body.facilityId;
      const waittingListSave = await new WaittingListRepo().save(new_wattingList);

   

      res.status(201).json({
        status: "Created",
        message: "Utilisateur créé avec succès !",
        user: waittingListSave,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Erreur interne du serveur : " + err,
      });
    }
  }


   async getAllWaitingListByFacility(req: Request, res: Response): Promise<void> {
     try {
 
       const existingWatingUsers = await new WaittingListRepo().getAllWattingListByfacility(parseInt(req.params["facilityId"]));
 
       res.status(200).json({
         status: "Success",
         data: existingWatingUsers,
       });
     } catch (error) {
       console.error("Error retrieving Users By facility:", error);
       if (!res.headersSent) {
         res.status(500).json({
           status: "Internal Server Error",
           message: "An error occurred while getting the Wating Users",
         });
       }
     }
   }


  


  async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const waittingListId = parseInt(req.params.WaittingListId);
      const { deletedBy } = req.body;

      if (!deletedBy) {
        res.status(400).json({ message: 'Le champ "deletedBy" est requis' });
        return;
      }

      const deletedWaittingList = await new WaittingListRepo().deleteOneWaittingList(waittingListId, deletedBy);

      res.status(200).json({
        message: 'Élément de la liste d\'attente supprimé',
        data: deletedWaittingList,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression', error: error });
    }
  }
}


 
  export default new WaittingListController();