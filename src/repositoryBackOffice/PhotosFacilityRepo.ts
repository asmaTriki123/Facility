import { PhotosFacility } from "../models/PhotosFacility";
import { TimeZoneService } from '../middleware/TimeZone';

interface IPhotosFacilityRepo {
    save(photosFacility: PhotosFacility): Promise<PhotosFacility>;
    update(photosFacility: PhotosFacility): Promise<PhotosFacility>;
    retrieveAll(facilityId: number): Promise<PhotosFacility[]>;
}

export class PhotosFacilityRepo implements IPhotosFacilityRepo {
    // Save a PhotosFacility object
    async save(photosFacility: PhotosFacility): Promise<PhotosFacility> {
        try {
            const savedPhotosFacility = await PhotosFacility.create({
                facilityId: photosFacility.facilityId,
                photosfacilityName: photosFacility.photosfacilityName,
                photosfacilityType: photosFacility.photosfacilityType,
                createdBy: photosFacility.createdBy,
                isDeleted: false,
                createdAt: await new TimeZoneService().getAdjustedTime(photosFacility.facilityId),
                updatedAt: await new TimeZoneService().getAdjustedTime(photosFacility.facilityId)
            });
            return savedPhotosFacility;
        } catch (error) {
            throw new Error("Failed to create PhotosFacility! " + error);
        }
    }

    // Update a PhotosFacility object
    async update(photosFacility: PhotosFacility): Promise<PhotosFacility> {
        try {
            const existingPhotosFacility = await PhotosFacility.findOne({
                where: { photosfacilityId: photosFacility.photosfacilityId },
            });
            if (!existingPhotosFacility) {
                throw new Error("PhotosFacility not found!");
            }

            existingPhotosFacility.photosfacilityName = photosFacility.photosfacilityName;
            existingPhotosFacility.photosfacilityType = photosFacility.photosfacilityType;
            existingPhotosFacility.updatedBy = photosFacility.updatedBy;
            existingPhotosFacility.updatedAt = await new TimeZoneService().getAdjustedTime(existingPhotosFacility.facilityId) ?? existingPhotosFacility.updatedAt;

            await existingPhotosFacility.save();
            return existingPhotosFacility;
        } catch (error) {
            throw new Error("Failed to update PhotosFacility! " + error);
        }
    }

    // Retrieve all PhotosFacility by facilityId
    async retrieveAll(facilityId: number): Promise<PhotosFacility[]> {
        try {
            return await PhotosFacility.findAll({
                where: {
                    isDeleted: false,
                    facilityId: facilityId,
                },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all PhotosFacility: ${error}`);
        }
    }
    async deleteFacilityPhoto(facilityId: number): Promise<void> {
        try {
            // Trouver la photo à supprimer
            const photosToDelete = await PhotosFacility.findAll({
                where: {
                    facilityId: facilityId, 
                },
            });
    
            if (!photosToDelete || photosToDelete.length === 0) {
                throw new Error("Aucune photo trouvée pour ce facilityId !");
            }
    
            // Supprimer toutes les photos trouvées
            for (let photo of photosToDelete) {
                await photo.destroy();
                console.log(`Photo ${photo.photosfacilityName} supprimée avec succès`);
            }
        } catch (error) {
            throw new Error("Failed to delete Facility Photo! " + error);
        }
    }

    

 

    // Soft delete a PhotosFacility object
 
}
