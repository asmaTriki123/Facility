import { Request, Response } from "express";
import { Hours } from "../models/Hours";
import { HoursRepo } from "../repositoryBackOffice/HoursRepo";
class HoursController {
    // create Hours object (Controller)

    async create(req: Request, res: Response) {
        console.log(req.body)
        try {           
            const savedHours = await new HoursRepo().save(req.body);
            res.status(201).json({
                status: "Created! ",
                message: "Successfully created Hours!",
                data: savedHours,

            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // update Hours object (Controller)
    async update(req: Request, res: Response) {
        try {
console.log("updated By",req.body)
            const new_Hours = new Hours();
            new_Hours.hoursId = parseInt(req.params["hoursId"]);
            new_Hours.hoursDay = req.body.hoursDay;
            new_Hours.hoursEndTime = req.body.hoursEndTime;
            new_Hours.hoursStartTime = req.body.hoursStartTime;
            new_Hours.hoursType = req.body.hoursType;
            new_Hours.updatedBy = req.body.updatedBy;
            new_Hours.hoursClosing =req.body.hoursClosing;
            new_Hours.hoursApponentonly = req.body.hoursApponentonly;
            const new_updateHours = await new HoursRepo().update(new_Hours);
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully updated Hours data!",
                data: new_updateHours
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // findAll By Facility  Hours object (Controller)
    async findAll(req: Request, res: Response) {
        try {
            const new_Hours = await new HoursRepo().retrieveAllByFacility(parseInt(req.params["facilityId"]));
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully fetched all Hourss data!",
                data: new_Hours,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // delete Hours object (Controller)
    async delete(req: Request, res: Response) {
        try {
            const new_HoursDelete = await new HoursRepo().delete(parseInt(req.params["hoursId"]), req.body.deletedBy);
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully deleted Hours!",
                data: new_HoursDelete,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }

}
export default new HoursController();
