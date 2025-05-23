;
import { Vehicle } from "../models/Vehicle";

interface IVehicle{
 save(vehicle: Vehicle): Promise<Vehicle>; 
 update(vehicle: Vehicle): Promise<Vehicle>;
 getAllVehicleBycreatedBy(createdBy: number): Promise<Vehicle[]> ;
} 

export class VehicleRepo implements IVehicle{


async save(vehicle: Vehicle): Promise<Vehicle> {
    try {
        const savedVehicle = await Vehicle.create({
            vehicleCategory: vehicle.vehicleCategory,
            vehicleConfirmed: vehicle.vehicleConfirmed,
            vehicleModel: vehicle.vehicleModel,
            vehicleType: vehicle.vehicleType,
            vehicleVIN: vehicle.vehicleVIN,
            rentId : vehicle.rentId,
            vehiclePlateTagNumber: vehicle.vehiclePlateTagNumber,
         //   vehicleRegistrationPhoto: vehicle.vehicleRegistrationPhoto,
            isDeleted: false,
            createdAt: new Date(),
            createdBy: vehicle.createdBy,
        });

        return savedVehicle;
    } catch (error) {
        throw new Error("Failed to create Vehicle: " + error);
    }
}

async update(vehicle: Vehicle): Promise<Vehicle>{
    try {
      const existingVehicle= await Vehicle.findOne({
        where: {
          vehicleId: vehicle.vehicleId,
        },
      });

      if (!existingVehicle) {
        throw new Error("Vehicle not found!");
      }

      existingVehicle.vehicleCategory = vehicle.vehicleCategory;
      existingVehicle.vehicleConfirmed = vehicle.vehicleConfirmed;
      existingVehicle.vehicleModel = vehicle.vehicleModel;
      existingVehicle.vehiclePlateTagNumber = vehicle.vehiclePlateTagNumber;
      existingVehicle.vehicleType = vehicle.vehicleType;
      existingVehicle.vehicleVIN = vehicle.vehicleVIN;
      //existingVehicle.vehicleRegistrationPhoto = vehicle.vehicleRegistrationPhoto;
      existingVehicle.updatedBy = vehicle.updatedBy;
      existingVehicle.rentId = vehicle.rentId;
      existingVehicle.updatedAt = new Date ();
      return await existingVehicle.save();

    } catch (error) {
      throw new Error("Failed to update Vehicle!" + error);
    }
  }

async getAllVehicleBycreatedBy(createdBy: number): Promise<Vehicle[]> {
      try {
  
        const vehicles = await Vehicle.findAll({
          where: {
            createdBy: createdBy,
          },
        });
        return vehicles;
      } catch (error) {
        throw new Error("Error fetching vehicles: " + error);
      }
 }


}

