import { Vehicle } from "../models/Vehicle";
import { VehicleRepo } from "../repositoryBackOffice/VehicleRepo";
import { Request, Response } from "express";
class VehicleController {
/*
  async createVehicle(req: Request, res: Response): Promise<void> {
    try {
      const newVehicule = new Vehicle();

      //  newVehicule.vehicleRegistrationPhoto = req.file ? `${req.file.filename}` : null;
      newVehicule.vehicleVIN = req.body.vehicleVIN;
      newVehicule.vehicleModel = req.body.vehicleModel;
      newVehicule.vehicleType = req.body.vehicleType;
      newVehicule.vehicleCategory = req.body.vehicleCategory;
      newVehicule.vehicleConfirmed = req.body.vehicleConfirmed;
      newVehicule.vehiclePlateTagNumber = req.body.vehiclePlateTagNumber;
      newVehicule.rentId = req.body.rentId;
      newVehicule.createdBy = req.body.createdBy;

      const savedPhotoUnit = await new VehicleRepo().save(newVehicule);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created Vehicule!",
        data: savedPhotoUnit,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Failed to create Vehicule: ${err}`,
      });
    }
  }*/
async createVehicle(req: Request, res: Response): Promise<void> {
    try {
        console.log("Requête création véhicule reçue:", {
            body: req.body,
            headers: req.headers
        });

        // Validation des champs requis
        const requiredFields = ['vehicleVIN', 'vehicleModel', 'vehicleType', 'rentId', 'createdBy'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                res.status(400).json({
                    status: "Bad Request",
                    message: `Missing required field: ${field}`
                });
                return;
            }
        }

        const newVehicle = new Vehicle();
        newVehicle.vehicleVIN = req.body.vehicleVIN;
        newVehicle.vehicleModel = req.body.vehicleModel;
        newVehicle.vehicleType = req.body.vehicleType;
        newVehicle.vehicleCategory = req.body.vehicleCategory || null;
        newVehicle.vehiclePlateTagNumber = req.body.vehiclePlateTagNumber || null;
        newVehicle.vehicleConfirmed = Boolean(req.body.vehicleConfirmed);
        newVehicle.rentId = req.body.rentId;
        newVehicle.createdBy = req.body.createdBy;

        const savedVehicle = await new VehicleRepo().save(newVehicle);

        if (!savedVehicle) {
            throw new Error("Failed to save vehicle to database");
        }

        console.log("Véhicule créé avec succès:", savedVehicle);

        // Solution 1: Retourner seulement les champs nécessaires sans utiliser l'opérateur spread
        res.status(201).json({
            status: "Success",
            message: "Vehicle created successfully",
            data: {
                vehicleId: savedVehicle.vehicleId,
                vehicleVIN: savedVehicle.vehicleVIN,
                vehicleModel: savedVehicle.vehicleModel,
                vehicleType: savedVehicle.vehicleType,
                vehicleCategory: savedVehicle.vehicleCategory,
                vehiclePlateTagNumber: savedVehicle.vehiclePlateTagNumber,
                vehicleConfirmed: savedVehicle.vehicleConfirmed,
                rentId: savedVehicle.rentId,
                createdBy: savedVehicle.createdBy
            }
        });

        // Solution alternative 2: Si vous voulez vraiment utiliser spread, supprimez vehicleId du spread
        /*
        const { vehicleId, ...vehicleData } = savedVehicle;
        res.status(201).json({
            status: "Success",
            message: "Vehicle created successfully",
            data: {
                vehicleId,
                ...vehicleData
            }
        });
        */
    } catch (err) {
        console.error("Erreur création véhicule:", err);
        res.status(500).json({
            status: "Internal Server Error",
            message: err || "Internal server error during vehicle creation"
        });
    }
}
  async updateVehicle(req: Request, res: Response) {
    try {

      const new_vehicle = new Vehicle();
      new_vehicle.vehicleId = parseInt(req.params["vehicleId"]);
      new_vehicle.vehicleVIN = req.body.vehicleVIN;
      new_vehicle.vehicleModel = req.body.vehicleModel;
      new_vehicle.vehicleType = req.body.vehicleType;
      new_vehicle.vehicleCategory = req.body.vehicleCategory;
      new_vehicle.vehicleConfirmed = req.body.vehicleConfirmed;
      new_vehicle.vehiclePlateTagNumber = req.body.vehiclePlateTagNumber;
      new_vehicle.updatedBy = req.body.updatedBy;
      new_vehicle.rentId = req.body.rentId;
      //new_vehicle.vehicleRegistrationPhoto = req.file ? `${req.file.filename}` : null;

      const updatedTypeUnit = await new VehicleRepo().update(new_vehicle);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully updated Vehicle data!",
        data: updatedTypeUnit,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }

  async getAllVehicle(req: Request, res: Response): Promise<void> {
    try {

      const existingVehicle = await new VehicleRepo().getAllVehicleBycreatedBy(parseInt(req.params["createdBy"]));

      res.status(200).json({
        status: "Success",
        data: existingVehicle,
      });
    } catch (error) {
      console.error("Error retrieving vehicles by createdBy:", error);
      if (!res.headersSent) {
        res.status(500).json({
          status: "Internal Server Error",
          message: "An error occurred while getting the vehicle",
        });
      }
    }
  }




}
export default new VehicleController();