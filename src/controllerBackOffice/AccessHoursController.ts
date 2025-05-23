

import { Request, Response } from "express";
import { AccessHours } from "../models/AccessHours";
import { AccessHoursRepo } from "../repositoryBackOffice/AccessHoursRepo";
class AccessHoursController {

    async update(req: Request, res: Response) {
        try {
      console.log("updated By",req.body)
            const new_HoursAcess = new AccessHours();
            new_HoursAcess.AccessHoursId = parseInt(req.params["AccessHoursId"]);
            new_HoursAcess.AccessHoursDay = req.body.AccessHoursDay;
            new_HoursAcess.AccessHoursEndTime = req.body.AccessHoursEndTime;
            new_HoursAcess.AccessHoursStartTime = req.body.AccessHoursStartTime;
            new_HoursAcess.AccessHoursType = req.body.AccessHoursType;
            new_HoursAcess.updatedBy = req.body.updatedBy;
            new_HoursAcess.AccessHoursClosing =req.body.AccessHoursClosing;
            new_HoursAcess.AccessHoursApponentonly = req.body.AccessHoursApponentonly;
            const new_updateHoursAcess = await new AccessHoursRepo().update(new_HoursAcess);
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully updated Hours Acess data!",
                data: new_updateHoursAcess
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    } 

     async findAll(req: Request, res: Response) {
            try {
                const new_HoursAcess = await new AccessHoursRepo().retrieveAllByFacility(parseInt(req.params["facilityId"]));
                res.status(200).json({
                    status: "Ok! ",
                    message: "Successfully fetched all Hours Acess data!",
                    data: new_HoursAcess,
                });
            } catch (err) {
                res.status(500).json({
                    status: "Internal Server Error! ",
                    message: "Internal Server Error!" + err,
                });
            }
        }


       async Create(req: Request, res: Response) {
               console.log(req.body)
               try {           
                   const savedHoursAcess = await new AccessHoursRepo().save(req.body);
                   res.status(201).json({
                       status: "Created! ",
                       message: "Successfully created Hours Acess!",
                       data: savedHoursAcess,
       
                   });
               } catch (err) {
                   res.status(500).json({
                       status: "Internal Server Error! ",
                       message: "Internal Server Error!" + err,
                   });
               }
           }
}

export default new AccessHoursController();