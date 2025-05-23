import { AmenitiesUnit } from "../models/AmenitiesUnit";
import { UnitSpecificAmenities } from "../models/UnitSpecificAmenities";

interface IUnitSpecificAmenitiesRepo {
    save(unitSpecificAmenities: UnitSpecificAmenities): Promise<UnitSpecificAmenities>;
    update(unitSpecificAmenities: UnitSpecificAmenities): Promise<UnitSpecificAmenities>;
    getAllUnitSpecificAmenities(createdBy: number): Promise<UnitSpecificAmenities[]> ;
  deleteUnitSpecificAmenities(UnitSpecificAmenitiesId: number, deletedBy: string): Promise<{
    amenity: UnitSpecificAmenities,
    updatedAmenitiesUnits: number
}> ;
}

export class UnitSpecificAmenitiesRepo implements IUnitSpecificAmenitiesRepo {

    async  save(unitSpecificAmenities: UnitSpecificAmenities): Promise<UnitSpecificAmenities>{
        try {
            const savedUnitSpecificAmenities = await UnitSpecificAmenities.create({
                UnitSpecificAmenitiesOptionName: unitSpecificAmenities.UnitSpecificAmenitiesOptionName,
                UnitSpecificAmenitiesSection: unitSpecificAmenities.UnitSpecificAmenitiesSection,
            //    UnitSpecificAmenitiesIsOptionAvailable: unitSpecificAmenities.UnitSpecificAmenitiesIsOptionAvailable,
                createdBy: unitSpecificAmenities.createdBy,
                isDeleted: false,
                createdAt: new Date(),
               
            });
            return savedUnitSpecificAmenities;
        } catch (error) {
            throw new Error("Failed to create UnitSpecificAmenities! " + error);
        }
    }

     async update(unitSpecificAmenities: UnitSpecificAmenities): Promise<UnitSpecificAmenities> {
            try {
                const existingUnitSpecificAmenities = await UnitSpecificAmenities.findOne({
                    where: { UnitSpecificAmenitiesId: unitSpecificAmenities.UnitSpecificAmenitiesId },
                });
                if (!existingUnitSpecificAmenities) {
                    throw new Error("UnitSpecificAmenities not found!");
                }
                existingUnitSpecificAmenities.UnitSpecificAmenitiesOptionName = unitSpecificAmenities.UnitSpecificAmenitiesOptionName;
                existingUnitSpecificAmenities.UnitSpecificAmenitiesSection = unitSpecificAmenities.UnitSpecificAmenitiesSection;
              //  existingUnitSpecificAmenities.UnitSpecificAmenitiesIsOptionAvailable = unitSpecificAmenities.UnitSpecificAmenitiesIsOptionAvailable;
                existingUnitSpecificAmenities.updatedBy = unitSpecificAmenities.updatedBy;
                existingUnitSpecificAmenities.updatedAt = new Date();
    
                await existingUnitSpecificAmenities.save();
                return existingUnitSpecificAmenities;
            } catch (error) {
                throw new Error("Failed to update Unit Specific Amenities! " + error);
            }
        }
 

      async getAllUnitSpecificAmenities(createdBy: number): Promise<UnitSpecificAmenities[]> {
        try {
    
          const unitSpecificAmenities = await UnitSpecificAmenities.findAll({
            where: {
              createdBy: createdBy,
            },
          });
          return unitSpecificAmenities;
        } catch (error) {
          throw new Error("Error fetching UnitSpecificAmenities: " + error);
        }
      }

      


  async deleteUnitSpecificAmenities(UnitSpecificAmenitiesId: number, deletedBy: string): Promise<{
    amenity: UnitSpecificAmenities,
    updatedAmenitiesUnits: number
}> {
    // 1. Vérifier si l'amenity existe
    const amenity = await UnitSpecificAmenities.findOne({
        where: { UnitSpecificAmenitiesId },
    });

    if (!amenity) {
        throw new Error("UnitSpecificAmenities n'existe pas");
    }

    if (amenity.isDeleted) {
        throw new Error("UnitSpecificAmenities a déjà été supprimée");
    }

    // 2. Vérifier les associations actives
    const activeAssociations = await AmenitiesUnit.count({
        where: {
            UnitSpecificAmenitiesId: UnitSpecificAmenitiesId,
            isDeleted: false,
            UnitSpecificAmenitiesIsOptionAvailable: true
        },
    });

    if (activeAssociations > 0) {
        throw new Error("You can't delete this amenity unit. Please delete the unit associated with this amenity first");
    }

    // 3. Soft delete de l'amenity
    amenity.isDeleted = true;
    amenity.deletedBy = deletedBy;
    await amenity.save();

    // 4. Soft delete des associations (même si UnitSpecificAmenitiesIsOptionAvailable = false)
    const [updatedCount] = await AmenitiesUnit.update({
        isDeleted: true,
        deletedBy: deletedBy,
        deletedAt: new Date()
    }, {
        where: {
            UnitSpecificAmenitiesId: UnitSpecificAmenitiesId,
            isDeleted: false
        }
    });

    return {
        amenity,
        updatedAmenitiesUnits: updatedCount
    };
}



      async retrieveAll(): Promise<UnitSpecificAmenities[]> {
             try {
                 return await UnitSpecificAmenities.findAll({
                     where: {
                         isDeleted: false
     
                     },
                 });
             } catch (error) {
                 throw new Error(`Failed to retrieve all Unit Amenities: ${error}`);
             }
         }
}
