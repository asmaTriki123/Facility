import { Request, Response } from "express";
import { Amenities } from "../models/Amenities";
import { AmenitiesRepo } from "../repositoryBackOffice/AmenitiesRepo"
import { AmenitiesFacility } from "../models/AmenitiesFacility";
import { AmenitiesFacilityRepo } from "../repositoryBackOffice/AmenitiesFacilityRepo";

class AmenitiesController {
    // create Amenities object (Controller)
    async create(req: Request, res: Response) {
        try {

            const savedAmenities = await new AmenitiesRepo().save(req.body);
            res.status(201).json({
                status: "Created!",
                message: "Successfully created Amenities!",
                data: savedAmenities,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }

    // update Amenities object (Controller)
    async update(req: Request, res: Response) {
        try {
            const updated_amenities = new Amenities();
            updated_amenities.amenitiesId = parseInt(req.params["amenitiesId"]);
            updated_amenities.amenitiesSection = req.body.amenitiesSection;
            updated_amenities.amenitiesOptionName = req.body.amenitiesOptionName;
            updated_amenities.updatedBy = req.body.updatedBy;
            const updatedAmenities = await new AmenitiesRepo().update(updated_amenities);
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

    // Find All By facilityId Amenities object (Controller)

    async findAll(req: Request, res: Response) {
        try {
            const amenitiesList = await new AmenitiesRepo().retrieveAll(req.body.facilityId);
            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all Amenities data!",
                data: amenitiesList,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }
    // Find All By Admin Amenities object (Controller)

    async findAllByAdmin(req: Request, res: Response) {
        try {
            const amenitiesList = await new AmenitiesRepo().retrieveAllByAdmin();
            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all Amenities data!",
                data: amenitiesList,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }

    // delete Amenities object (Controller)

async delete(req: Request, res: Response) {
    try {
        const amenitiesId = parseInt(req.params["amenitiesId"]);

        const countActiveOptions = await AmenitiesFacility.count({
            where: {
                amenitiesId: amenitiesId,
                amenitiesIsOptionAvailable: true,
                isDeleted: false,
            },
        });

        if (countActiveOptions > 0) {
            res.status(400).json({
                status: "Bad Request",
                message: `Cannot delete this amenity. Please delete the associated facilities first.`,
            });
        } else {
            await AmenitiesFacility.update(
                { isDeleted: true },
                {
                    where: {
                        amenitiesId: amenitiesId,
                    },
                }
            );

            const deletedAmenities = await new AmenitiesRepo().delete(
                amenitiesId,
                req.body.deletedBy
            );

            res.status(200).json({
                status: "Ok!",
                message: "Successfully deleted Amenity and its associated facilities!",
                data: deletedAmenities,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error!",
            message: "Internal Server Error! " + err,
        });
    }
}



    async GroupedbySection (req: Request, res: Response){
    try {
            const AmenitiesGroupedbySection = await new AmenitiesRepo().getAllAmenitiesBySection();
            res.status(200).json({
                status: "Ok!",
                message: "Successfully  fetched all Amenities with Section!",
                data: AmenitiesGroupedbySection,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }    
    }
    async GetAmenitiesByFacility (req: Request, res: Response){
        try {
                const AmenitiesGroupedbySection = await new AmenitiesRepo().getAmenitiesByFacility(parseInt(req.params["facilityId"]));
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully  fetched all Amenities with Section!",
                    data: AmenitiesGroupedbySection,
                });
            } catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error! " + err,
                });
            }    
        }
   
    
}

export default new AmenitiesController();
