import { Request, Response } from "express";
import { PhotoVehicle } from "../models/PhotoVehicle";
import { PhotoVehicleRepo } from "../repositoryBackOffice/PhotoVehicleRepo";

class PhotoVehicleController {
    async createPhotoVehicle(req: Request, res: Response): Promise<void> {
      try {
        const newPhotoVehicle = new PhotoVehicle();
        newPhotoVehicle.photoVehicleName = req.file ? req.file.filename : null;
        newPhotoVehicle.createdAt = new Date();
        newPhotoVehicle.createdBy = req.body.createdBy;
        newPhotoVehicle.vehicleId = req.body.vehicleId;
        newPhotoVehicle.isDeleted =false;
        const savedPhotoVehicle = await new PhotoVehicleRepo().save(newPhotoVehicle);
        
        res.status(201).json({
          status: "Created!",
          message: "Successfully created photo vehicle!",
          data: savedPhotoVehicle,
        });
      } catch (err) {
        res.status(500).json({
          status: "Internal Server Error",
          message: `Failed to create photo vehicle: ${err}`,
        });
      }
    }

    async updatePhotoVehicle (req: Request, res: Response): Promise<void>{
         try {
            const updatedPhotoVehicle= new PhotoVehicle();
            updatedPhotoVehicle.photoVehicleId = parseInt(req.params["photoVehicleId"]);
            updatedPhotoVehicle.photoVehicleName = req.file ? req.file.filename : null; 
            updatedPhotoVehicle.updatedAt = new Date(); 
            updatedPhotoVehicle.updatedBy = req.body.updatedBy;
            updatedPhotoVehicle.vehicleId = req.body.vehicleId; 
            const savedPhotoVehicle= await new PhotoVehicleRepo().update(updatedPhotoVehicle);
            res.status(200).json({
              status: "Ok",
              message: "Successfully updated photo vehicle data!",
              data: savedPhotoVehicle,
            });
        
          } catch (err) {
            res.status(500).json({
              status: "Internal Server Error",
              message: `Failed to update photo vehicle: ${err}`,
            });
          }
    }

    async getAllPhotoUnitByVehicleId(req: Request, res: Response): Promise<void> {
      try {
        const vehicleId = parseInt(req.params["vehicleId"]); 
        const photoVehicles = await new PhotoVehicleRepo().retrieveByVehicle(vehicleId);
    
        res.status(200).json({
          status: "Ok",
          message: "Successfully fetched all photo vehicle data by vehicle.",
          data: photoVehicles,
        });
      } catch (error) {
        res.status(500).json({
          status: "Internal Server Error",
          message: `Failed to fetch photo vehicle: ${error}`,
        });
      }
    }
}
export default new PhotoVehicleController();