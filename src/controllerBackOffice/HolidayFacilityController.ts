import { Request, Response } from "express";
import { HolidaysFacility } from "../models/HolidaysFacility";
import { HolidaysFacilityRepo } from "../repositoryBackOffice/HolidaysFacilityRepo";

class HolidaysFacilityController {
 
    async create(req: Request, res: Response) {
        try {
            const savedHolidaysFacility = await new HolidaysFacilityRepo().save(req.body);
            res.status(201).json({
                status: "Created! ",
                message: "Successfully created Holidays Facility!",
                data: savedHolidaysFacility,

            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
  async update(req: Request, res: Response) {
            try {
                const updated_holidays = new HolidaysFacility();
                console.log("update holidays of facility",req.body)
                updated_holidays.holidaysfacilityId = parseInt(req.params["holidaysfacilityId"]);
                updated_holidays.holidaysIsOptionAvailable = req.body.holidaysIsOptionAvailable;
                updated_holidays.updatedBy = req.body.updatedBy;
                const updatedHolidaysFacility = await new HolidaysFacilityRepo().update(updated_holidays);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully updated HolidaysFacility data!",
                    data: updatedHolidaysFacility,
                });
            } catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error! " + err,
                });
            }
        }

}

export default new HolidaysFacilityController();
