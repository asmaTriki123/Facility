import { AmenitiesUnit } from "../models/AmenitiesUnit";
import { Unit } from "../models/Unit";
import { UnitSpecificAmenities } from "../models/UnitSpecificAmenities";
interface IAmenitiesUnit {
    save(amenitiesUnit: AmenitiesUnit): Promise<AmenitiesUnit>;

}

export class AmenitiesUnitRepo implements IAmenitiesUnit {

    async save(amenitiesUnit: AmenitiesUnit): Promise<AmenitiesUnit> {
        try {
            const savedAmenitiesUnit = await AmenitiesUnit.create({

                unitId: amenitiesUnit.unitId,
                UnitSpecificAmenitiesId: amenitiesUnit.UnitSpecificAmenitiesId,
                UnitSpecificAmenitiesIsOptionAvailable: amenitiesUnit.UnitSpecificAmenitiesIsOptionAvailable,
                createdBy: amenitiesUnit.createdBy,
                isDeleted: false,
                createdAt: new Date(),

            });
            return savedAmenitiesUnit;
        } catch (error) {
            throw new Error("Failed to create AmenitiesUnit! " + error);
        }
    }

   async retrieveAllByUnit(unitId: string): Promise<AmenitiesUnit[]> {
      try {
        return await AmenitiesUnit.findAll({
          where: {
            isDeleted: false,
            unitId: unitId
          },
          include: [
                      {
                        model: UnitSpecificAmenities,
                        as: 'unitSpecificAmenities',
                        required: false
                      },]
         
        });
      } catch (error) {
        throw new Error("Error fetching unites: " + error);
      }
    }

  async update(amenitiesUnit: AmenitiesUnit): Promise<AmenitiesUnit> {
    try {
        // Find the existing record
        const existingAmenitiesUnit = await AmenitiesUnit.findOne({
            where: {
                amenitiesunitId: amenitiesUnit.amenitiesunitId,
                
            },
             
        });

        if (!existingAmenitiesUnit) {
            throw new Error("AmenitiesUnit not found!");
        }

        // Update the fields that should change
        existingAmenitiesUnit.UnitSpecificAmenitiesIsOptionAvailable = 
            amenitiesUnit.UnitSpecificAmenitiesIsOptionAvailable;
        
        // Update timestamp
        existingAmenitiesUnit.updatedAt = new Date();
        
        // Make sure to use the input parameter's updatedBy, not the existing record's
        existingAmenitiesUnit.updatedBy = amenitiesUnit.updatedBy;

        // Save the changes
        await existingAmenitiesUnit.save();
        
        return existingAmenitiesUnit;
    } catch (error) {
        throw new Error(`Failed to update Amenities: ${error instanceof Error ? error.message : String(error)}`);
    }
}
}