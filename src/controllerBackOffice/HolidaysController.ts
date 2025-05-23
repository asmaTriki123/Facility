import { Request, Response } from "express";
import { Holidays } from "../models/Holidays";
import { HolidaysRepo } from "../repositoryBackOffice/HolidaysRepo";
import { HolidaysFacilityRepo } from "../repositoryBackOffice/HolidaysFacilityRepo";
class HolidaysController {
    // create Holidays object (Controller)

    async create(req: Request, res: Response) {
        console.log(req.body)
        try {
            const savedHolidays = await new HolidaysRepo().save(req.body);
            res.status(201).json({
                status: "Created! ",
                message: "Successfully created Holidays!",
                data: savedHolidays,

            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // update Holidays object (Controller)
    async update(req: Request, res: Response) {
        try {

            const new_Holidays = new Holidays();
            new_Holidays.holidaysId = parseInt(req.params["holidaysId"]);
            new_Holidays.holidaysCountry = req.body.holidaysCountry;
            new_Holidays.holidaysName = req.body.holidaysName;
            new_Holidays.updatedBy = req.body.updatedBy;
            const new_updateHolidays = await new HolidaysRepo().update(new_Holidays);
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully updated Holidays data!",
                data: new_updateHolidays
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // Find All By Admin Holidays object (Controller)

    async findAllByAdmin(req: Request, res: Response) {
        try {
            const holidaysList = await new HolidaysRepo().retrieveAllByAdmin();
            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all Holidays data!",
                data: holidaysList,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }
    // findAllByFacility Holidays object (Controller)
    async findAll(req: Request, res: Response) {
        try {
            const new_Holidays = await new HolidaysRepo().retrieveAll(req.body.facilityId);
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully fetched all Holidayss data!",
                data: new_Holidays,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // delete Holidays object (Controller)
async delete(req: Request, res: Response) {
    try {
        const holidaysId = parseInt(req.params.holidaysId);
        const deletedBy = req.body.deletedBy;

        const repo = new HolidaysRepo();
        const result = await repo.deleteHolidayIfPossible(holidaysId, deletedBy);

        let responseStatus = 200;
        let responseBody: any = {};

        if (!result.success) {
            responseStatus = 400;
            responseBody = {
                status: "error",
                message: result.message
            };
        } else {
            responseBody = {
                status: "success",
                message: `Suppression réussie (${result.updatedFacilities} équipements affectés)`,
                data: {
                    holiday: result.holiday,
                    updatedFacilities: result.updatedFacilities
                }
            };
        }

        res.status(responseStatus).json(responseBody);

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `Erreur: ${error instanceof Error ? error.message : String(error)}`
        });
    }
}



    async findAllByholidaysCountry(req: Request, res: Response) {
        try {
            const holidaysCountryName = req.params["holidaysCountry"]; // Récupérer la chaîne directement

            const HolidayCountry = await new HolidaysFacilityRepo().getAllholidaysCountryByCountry(holidaysCountryName);
            console.log("data holidays country", HolidayCountry)
            res.status(200).json({
                status: "Success",
                message: "Successfully get Holidays!",
                data: HolidayCountry,
            });
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error",
                message: "An error occurred while fetching the HolidayCountry",
            });
        }
    }
    
    async findAllByholidaysCountryAvailable(req: Request, res: Response) {
        try {
            const holidaysCountryName = req.params["holidaysCountry"]; // Récupérer la chaîne directement

            const HolidayCountry = await new HolidaysRepo().getAllholidaysByCountryAvailaible(holidaysCountryName);
            console.log("data holidays country", HolidayCountry)
            res.status(200).json({
                status: "Success",
                message: "Successfully get Holidays Availaible!",
                data: HolidayCountry,
            });
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error",
                message: "An error occurred while fetching the HolidayCountry availaible",
            });
        }
    }
}
export default new HolidaysController();
