import { Request, Response } from "express";
import { UnitSpecificAmenitiesRepo } from "../repositoryBackOffice/UnitSpecificAmenitiesRepo";
import { UnitSpecificAmenities } from "../models/UnitSpecificAmenities";
class AmenitiesController {

     async create(req: Request, res: Response) {
            try {
               
                const savedUnitSpecificAmenities = await new UnitSpecificAmenitiesRepo().save(req.body);
                res.status(201).json({
                    status: "Created!",
                    message: "Successfully created Unit Specific Amenities!",
                    data: savedUnitSpecificAmenities,
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
                const updated_unitSpecificAmenities = new UnitSpecificAmenities();
                updated_unitSpecificAmenities.UnitSpecificAmenitiesId = parseInt(req.params["UnitSpecificAmenitiesId"]);
                updated_unitSpecificAmenities.UnitSpecificAmenitiesSection = req.body.UnitSpecificAmenitiesSection;
                updated_unitSpecificAmenities.UnitSpecificAmenitiesOptionName = req.body.UnitSpecificAmenitiesOptionName;
              //  updated_unitSpecificAmenities.UnitSpecificAmenitiesIsOptionAvailable = req.body.UnitSpecificAmenitiesIsOptionAvailable;
                updated_unitSpecificAmenities.updatedBy = req.body.updatedBy;
    
                const updatedAmenities = await new UnitSpecificAmenitiesRepo().update(updated_unitSpecificAmenities);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully updated Unit specific Amenities data!",
                    data: updatedAmenities,
                });
            } catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error! " + err,
                });
            }
        }
    
        async getAllUnitSpecificAmenitieBycreatedBy (req: Request, res: Response){
            try{
 const existingUnitSpecificAmenitie = await new UnitSpecificAmenitiesRepo().getAllUnitSpecificAmenities(parseInt(req.params["createdBy"]));
  
       res.status(200).json({
        status: "Success",
        data: existingUnitSpecificAmenitie,
      });
            }
            catch(error){
                 res.status(500).json({
        status: "Internal Server Error",
        message: "An error occurred while fetching the UnitSpecificAmenities ",
      });
            }
        }
async delete(req: Request, res: Response): Promise<Response> {
    try {
        const result = await new UnitSpecificAmenitiesRepo().deleteUnitSpecificAmenities(
            parseInt(req.params.UnitSpecificAmenitiesId),
            req.body.deletedBy
        );

        return res.status(200).json({
            message: `UnitSpecificAmenities supprimée avec ${result.updatedAmenitiesUnits} association(s)`,
            data: result.amenity,
        });
    } catch (error) {
        // Gestion type-safe de l'erreur
        if (error instanceof Error) {
            const statusCode = error.message.includes("n'existe pas") ? 404 :
                            error.message.includes("déjà été supprimée") ? 400 :
                            error.message.includes("désactivez d'abord") ? 400 : 500;

            return res.status(statusCode).json({
                message: error.message,
            });
        }

        // Cas où l'erreur n'est pas une instance d'Error
        return res.status(500).json({
            message: "Une erreur inconnue est survenue",
        });
    }
}



            async getAllAmenitiesUnit (req: Request, res: Response){
                    try {
                              const AmenitiesList = await new UnitSpecificAmenitiesRepo().retrieveAll();
                              res.status(200).json({
                                  status: "Ok!",
                                  message: "Successfully fetched all Amenities data!",
                                  data: AmenitiesList,
                              });
                          } catch (err) {
                              res.status(500).json({
                                  status: "Internal Server Error!",
                                  message: "Internal Server Error! " + err,
                              });
                          }
                }
       
}

export default new  AmenitiesController (); 