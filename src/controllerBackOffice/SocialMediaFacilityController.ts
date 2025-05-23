import { Request, Response } from "express";
import { SocialMedia_FacilityRepo } from "../repositoryBackOffice/SocialMediaFacilityRepo";


class SocialMediaFacilityController {

    async createSocialMediaFacility (req: Request, res: Response) {
             try {
                       
                        const savedSocialMediaFacility = await new SocialMedia_FacilityRepo().save(req.body);
                        res.status(201).json({
                            status: "Created!",
                            message: "Successfully created SocialMedia_Facility!",
                            data: savedSocialMediaFacility,
                        });
                    } catch (err) {
                        res.status(500).json({
                            status: "Internal Server Error!",
                            message: "Internal Server Error! " + err,
                        });
                    }
        }
}

export default new SocialMediaFacilityController();