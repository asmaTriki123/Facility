import { PhotoUnit } from "../models/PhotoUnit";

interface IPhotoUnit{
 save(photoUnit: PhotoUnit): Promise<PhotoUnit>; 
 update(photoUnit: PhotoUnit): Promise<PhotoUnit>;
 retrieveByFacility(facilityId: number): Promise<PhotoUnit[]> 
} 

export class PhotoUnitRepo implements IPhotoUnit{


async save(photoUnit: PhotoUnit): Promise<PhotoUnit> {
  try {
    const savedPhotoUnit = await PhotoUnit.create({
      photoUnitName: photoUnit.photoUnitName,
      createdBy: photoUnit.createdBy,
      createdAt: photoUnit.createdAt,
      unitId :photoUnit.unitId,
      photoUnitType : photoUnit.photoUnitType,
       isDeleted: false,
    });

    return savedPhotoUnit;
  } catch (error) {
    throw new Error("Failed to create photo unit: " + error);
  }
}


async update(photoUnit: PhotoUnit): Promise<PhotoUnit> {
  try {
   
    const existingPhotoUnit = await PhotoUnit.findOne({
      where: {
        photoUnitId: photoUnit.photoUnitId,
      },
    });

    if (!existingPhotoUnit) {
      throw new Error("Photo Unit not found!");
    }

   
    existingPhotoUnit.updatedAt = new Date(); 
    existingPhotoUnit.photoUnitName = photoUnit.photoUnitName;
    existingPhotoUnit.updatedBy = photoUnit.updatedBy;
    existingPhotoUnit.unitId = photoUnit.unitId;
    existingPhotoUnit.photoUnitType = photoUnit.photoUnitType;
    
    await existingPhotoUnit.save();
    return existingPhotoUnit;

  } catch (error) {
    throw new Error("Failed to update Photo Unit: " + error);
  }
}
 async retrieveByFacility(unitId: number): Promise<PhotoUnit[]> {
  try {
    const photoUnits = await PhotoUnit.findAll({
      where: {
        unitId: unitId,
        isDeleted: false,  
      },
    });

    if (!photoUnits) {
      throw new Error(`No active photo units found for unitId ${unitId}!`);
    }

    return photoUnits; 
  } catch (error) {
    throw new Error("Failed to find photo units by unitId: " + error);
  }
}


 async deleteFacilityPhoto(unitId: number): Promise<void> {
        try {
            // Trouver la photo à supprimer
            const photosToDelete = await PhotoUnit.findAll({
                where: {
                    unitId: unitId, 
                },
            });
    
            if (!photosToDelete || photosToDelete.length === 0) {
                throw new Error("Aucune photo trouvée pour ce unit !");
            }
    
            // Supprimer toutes les photos trouvées
            for (let photo of photosToDelete) {
                await photo.destroy();
                console.log(`Photo ${photo.photoUnitName} supprimée avec succès`);
            }
        } catch (error) {
            throw new Error("Failed to delete Facility Photo! " + error);
        }
    }


} 