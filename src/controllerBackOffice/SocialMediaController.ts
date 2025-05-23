import { Response, Request } from "express";
import { SocialMedia } from "../models/SocialMedia";
import { SocialMediaRepository } from "../repositoryBackOffice/SocialMediaRepo";

class SocialMediaController {

    async createSocialMedia(req: Request, res: Response) {
    
        try {
    
          const newSocialMedia = new SocialMedia();
          newSocialMedia.socialMediaName = req.body.socialMediaName;
          newSocialMedia.createdBy = req.body.createdBy;
          const savedSocialMedia = await new SocialMediaRepository().save(newSocialMedia);
    
          res.status(201).json({
            status: "Created! ",
            message: "Successfully created social media!",
            data: savedSocialMedia,
    
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error! ",
            message: "Internal Server Error!" + err,
          });
        }
      }

    

    async updateSocialMedia(req: Request, res: Response) {
        try {
    
          const new_socialmedia = new SocialMedia();
          new_socialmedia.socialMediaId = parseInt(req.params["socialMediaId"]);
          new_socialmedia.socialMediaName = req.body.socialMediaName;
          new_socialmedia.updatedBy = req.body.updatedBy;
          const updatedSocialMedia = await new SocialMediaRepository().update(new_socialmedia);
          res.status(200).json({
            status: "Ok! ",
            message: "Successfully updated social media data!",
            data: updatedSocialMedia,
          });
        } catch (err) {
          res.status(500).json({
            status: "Internal Server Error! ",
            message: "Internal Server Error!" + err,
          });
        }
      }


      async findAllSocialMediaById (req: Request, res: Response) {
         try {
            const createdBy = parseInt(req.params["createdBy"]); 
            if (isNaN(createdBy)) {
               res.status(400).json({
                status: "Bad Request",
                message: "Invalid createdBy provided.",
              });
            }
        
            const photoUnits = await new SocialMediaRepository().retrieveAll(createdBy);
        
            res.status(200).json({
              status: "Ok",
              message: "Successfully fetched all social media data by la manager.",
              data: photoUnits,
            });
          } catch (error) {
            res.status(500).json({
              status: "Internal Server Error",
              message: `Failed to fetch social media: ${error}`,
            });
          }
      }


}
export default new SocialMediaController();