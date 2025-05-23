import { SocialMedia } from "../models/SocialMedia";
interface ISocialMedia {
  save(socialmedia: SocialMedia): Promise<SocialMedia>;
   update(socialmedia: SocialMedia): Promise<SocialMedia>;

}

export class SocialMediaRepository implements ISocialMedia {
      async save(socialmedia: SocialMedia): Promise<SocialMedia> {
    
        try {
          const savedTypeUnit = await SocialMedia.create({
            socialMediaName: socialmedia.socialMediaName,
            createdBy: socialmedia.createdBy,
            isDeleted: false,
            createdAt: new Date(),

          });
    
          return savedTypeUnit;
        } catch (error) {
          throw new Error("Failed to create social media!" + error);
        }
      }

  async update(socialmedia: SocialMedia): Promise<SocialMedia> {
    try {
      const existingSocialMedia = await SocialMedia.findOne({
        where: {
          socialMediaId: socialmedia.socialMediaId,
        },
      });

      if (!existingSocialMedia) {
        throw new Error("socialmedia not found!");
      }

      existingSocialMedia.socialMediaName = socialmedia.socialMediaName;
     
      existingSocialMedia.updatedBy = socialmedia.updatedBy;
      existingSocialMedia.updatedAt = new Date();
      return await existingSocialMedia.save();

    } catch (error) {
      throw new Error("Failed to update TypeUnit!" + error);
    }
  }

  async retrieveAll(createdBy: number): Promise<SocialMedia[]> {
     try {
 
       return await SocialMedia.findAll({
         where: {
           isDeleted: false,
           createdBy: createdBy
         }
       });
     } catch (error) {
       throw new Error(`Failed to retrieve social media: ${error}`);
     }
   }


}