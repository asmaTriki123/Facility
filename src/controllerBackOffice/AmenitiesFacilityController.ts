import { Request, Response } from "express";
import { AmenitiesFacilityRepo } from "../repositoryBackOffice/AmenitiesFacilityRepo";
import { AmenitiesFacility } from "../models/AmenitiesFacility";
class  AmenitiesFacilityController{
 async create (req: Request, res: Response) {
         try {
                   
                    const savedAmenitiesFacility = await new AmenitiesFacilityRepo().save(req.body);
                    res.status(201).json({
                        status: "Created!",
                        message: "Successfully created AmenitiesFacility_Unit!",
                        data: savedAmenitiesFacility,
                    });
                } catch (err) {
                    res.status(500).json({
                        status: "Internal Server Error!",
                        message: "Internal Server Error! " + err,
                    });
                }
    }
      async update(req: Request, res: Response) {
            try {
                const updated_amenities = new AmenitiesFacility();
                console.log("update amenities of facility",req.body)
                updated_amenities.amenitiesfacilityId = parseInt(req.params["amenitiesfacilityId"]);

                updated_amenities.amenitiesIsOptionAvailable = req.body.amenitiesIsOptionAvailable;
                updated_amenities.updatedBy = req.body.updatedBy;
                const updatedAmenities = await new AmenitiesFacilityRepo().update(updated_amenities);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully updated Amenities data!",
                    data: updatedAmenities,
                });
            } catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error! " + err,
                });
            }
        }


}
export default new AmenitiesFacilityController();