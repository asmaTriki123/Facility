import { Request, Response } from "express";
import { AmenitiesUnitRepo } from "../repositoryBackOffice/AmenitiesUnitRepo";
import { AmenitiesUnit } from "../models/AmenitiesUnit";
class  AmenitiesUnitController{
 async create (req: Request, res: Response) {
         try {
                   
                    const savedAmenitiesUnit= await new AmenitiesUnitRepo().save(req.body);
                    res.status(201).json({
                        status: "Created!",
                        message: "Successfully created AmenitiesUnit!",
                        data: savedAmenitiesUnit,
                    });
                } catch (err) {
                    res.status(500).json({
                        status: "Internal Server Error!",
                        message: "Internal Server Error! " + err,
                    });
                }
    }

    async getAllAmentiesUnit (req: Request, res: Response){
         try {
              const new_unit = await new AmenitiesUnitRepo().retrieveAllByUnit(req.params["unitId"]);
              res.status(200).json({
                status: "Ok! ",
                message: "Successfully fetched all unit data!",
                data: new_unit,
              });
            } catch (err) {
              res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!"+err,
              });
            }
    } 

   
    async updateAmentiesUnit(req: Request, res: Response) {
       try {
   
         const new_amenties = new AmenitiesUnit();
         new_amenties.amenitiesunitId = parseInt(req.params["amenitiesunitId"]);
         new_amenties.UnitSpecificAmenitiesIsOptionAvailable = req.body.UnitSpecificAmenitiesIsOptionAvailable;
     
        
         new_amenties.updatedAt = new Date();
      
   
   
         const new_updateUnit= await new AmenitiesUnitRepo().update(new_amenties);
         res.status(200).json({
           status: "Ok! ",
           message: "Successfully updated Amenities Unit data!",
           data: new_updateUnit
         });
       } catch (err) {
         res.status(500).json({
           status: "Internal Server Error! ",
           message: "Internal Server Error!" + err,
         });
       }
     }
}
export default new AmenitiesUnitController();