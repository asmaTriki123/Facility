import { AmenitiesFacility } from "../models/AmenitiesFacility";
import { TimeZoneService } from "../middleware/TimeZone";

interface IAmenitiesFacility {
    save(AmenitiesFacility: AmenitiesFacility): Promise<AmenitiesFacility>;
    update(amenitiesFacility: AmenitiesFacility): Promise<AmenitiesFacility>
}

export class AmenitiesFacilityRepo implements IAmenitiesFacility {

    async save(amenitiesFacility: AmenitiesFacility): Promise<AmenitiesFacility> {
        try {
            const savedAmenitiesFacility = await AmenitiesFacility.create({

                facilityId: amenitiesFacility.facilityId,
                amenitiesId: amenitiesFacility.amenitiesId,
                amenitiesIsOptionAvailable: amenitiesFacility.amenitiesIsOptionAvailable,
                createdBy: amenitiesFacility.createdBy,
                isDeleted: false,
                // createdAt: await new TimeZoneService().getAdjustedTime(amenitiesFacility.facilityId),

            });
            return savedAmenitiesFacility;
        } catch (error) {
            throw new Error("Failed to create AmenitiesFacility! " + error);
        }
    }
async hasActiveFacilityAssociations(amenitiesId: number): Promise<boolean> {
    const count = await AmenitiesFacility.count({
        where: {
            amenitiesId,
            amenitiesIsOptionAvailable: true,
            isDeleted: false,
        },
    });
    return count > 0;
}

    async update(amenitiesFacility: AmenitiesFacility): Promise<AmenitiesFacility> {
        try {
            console.log("updated by ",amenitiesFacility)
            const existingAmenities = await AmenitiesFacility.findOne({
                where: { amenitiesFacilityId: amenitiesFacility.amenitiesfacilityId },
            });
            if (!existingAmenities) {
                throw new Error("Amenities facility not found!");
            }
            existingAmenities.amenitiesIsOptionAvailable = amenitiesFacility.amenitiesIsOptionAvailable;
            existingAmenities.updatedBy = amenitiesFacility.updatedBy;
            existingAmenities.updatedAt = await new TimeZoneService().getAdjustedTime(existingAmenities.facilityId) ?? existingAmenities.updatedAt
            await existingAmenities.save();
            return existingAmenities;
        } catch (error) {
            throw new Error("Failed to update Amenities Facility! " + error);
        }
    }
    
   
}