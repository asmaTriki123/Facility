import { Request, Response } from "express";
import { Coordinate } from "../models/Coordinate";
import { CoordinateRepo } from "../repositoryBackOffice/CoordinateRepo";
class CoordinateController {

    async create(req: Request, res: Response) {
        console.log(req.body)
        try {
            const savedCoordinate = await new CoordinateRepo().save(req.body);
            res.status(201).json({
                status: "Created! ",
                message: "Successfully created Coordinate!",
                data: savedCoordinate,

            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // update Coordinate object (Controller)
    async update(req: Request, res: Response) {
        try {

            const new_coordinate = new Coordinate();
            new_coordinate.coordinateId = parseInt(req.params["coordinateId"]);
            new_coordinate.coordinateAddress = req.body.coordinateAddress;
            new_coordinate.coordinateCity = req.body.coordinateCity;
            new_coordinate.coordinateState = req.body.coordinateState;
            new_coordinate.coordinateZip = req.body.coordinateZip;
            new_coordinate.updatedBy = req.body.updatedBy;
            const new_updateCoordinate = await new CoordinateRepo().update(new_coordinate);
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully updated Coordinate data!",
                data: new_updateCoordinate
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // findAll By Facility  Coordinate object (Controller)
    async findAll(req: Request, res: Response) {
        try {
            const new_coordinate = await new CoordinateRepo().retrieveAll(parseInt(req.params["facilityId"]));
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully fetched all Coordinates data!",
                data: new_coordinate,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // delete Coordinate object (Controller)
    async delete(req: Request, res: Response) {
        try {
            const new_coordinateDelete = await new CoordinateRepo().delete(parseInt(req.params["coordinateId"]), req.body.deletedBy);
            res.status(200).json({
                status: "Ok! ",
                message: "Successfully deleted Coordinate!",
                data: new_coordinateDelete,
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
export default new CoordinateController();
