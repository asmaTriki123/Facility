import { SocialMediaFacility } from "../models/SocialMedia_Facility";

interface ISocialMedia_Facility {
    save(socialMediaFacility: SocialMediaFacility): Promise<SocialMediaFacility>;
  
} 

export class SocialMedia_FacilityRepo implements ISocialMedia_Facility {

       async save(socialMediaFacility: SocialMediaFacility): Promise<SocialMediaFacility> {
            try {
                const savedSocialMediaFacility = await SocialMediaFacility.create({
                   
                    facilityId: socialMediaFacility.facilityId,
                    socialMediaId: socialMediaFacility.socialMediaId,
                    SocialMediaFacilityURL: socialMediaFacility.SocialMediaFacilityURL,
                    createdBy: socialMediaFacility.createdBy,

                    isDeleted: false,
                    createdAt: new Date(),
                   
                });
                return savedSocialMediaFacility;
            } catch (error) {
                throw new Error("Failed to create SocialMediaFacility! " + error);
            }
        }

        
}