import { PhotoVehicle } from "../models/PhotoVehicle";
interface IPhotoVehicle{

 save(photoVehicle: PhotoVehicle): Promise<PhotoVehicle>; 

} 

export class PhotoVehicleRepo implements IPhotoVehicle{
    async save(photoVehicle: PhotoVehicle): Promise<PhotoVehicle> {
      try {
        const savedPhotoVehicle= await PhotoVehicle.create({
          photoVehicleName: photoVehicle.photoVehicleName,
          createdBy: photoVehicle.createdBy,
          createdAt: photoVehicle.createdAt,
          vehicleId :photoVehicle.vehicleId,
          isDeleted: false,
        });
    
        return savedPhotoVehicle;
      } catch (error) {
        throw new Error("Failed to create photo vehicle: " + error);
      }
    }


    async update(photovehicle: PhotoVehicle): Promise<PhotoVehicle> {
      try {
       
        const existingPhotoVehicle = await PhotoVehicle.findOne({
          where: {
            photoVehicleId: photovehicle.photoVehicleId,
          },
        });
    
        if (!existingPhotoVehicle) {
          throw new Error("Photo Vehicle not found!");
        }
    
       
        existingPhotoVehicle.updatedAt = new Date(); 
        existingPhotoVehicle.photoVehicleName = photovehicle.photoVehicleName;
        existingPhotoVehicle.updatedBy = photovehicle.updatedBy;
        existingPhotoVehicle.vehicleId = photovehicle.vehicleId;
    
        
        await existingPhotoVehicle.save();
        return existingPhotoVehicle;
    
      } catch (error) {
        throw new Error("Failed to update Photo Vehicle: " + error);
      }
    }

    async retrieveByVehicle(vehicleId: number): Promise<PhotoVehicle[]> {
      try {
      
        const photoVehicles= await PhotoVehicle.findAll({
          where: {
            vehicleId: vehicleId,
            isDeleted: false,  
          },
        });
    
        if (!photoVehicles) {
          throw new Error(`No active photo vehicles found for vehicleId ${vehicleId}!`);
        }
    
        return photoVehicles; 
      } catch (error) {
        throw new Error("Failed to find photo vehicles by vehicleId: " + error);
      }
    }
    

    
}