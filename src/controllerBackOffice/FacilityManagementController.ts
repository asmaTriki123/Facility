import { Request, Response } from "express";
import { FacilityManagementRepo } from "../repositoryBackOffice/FacilityManagementRepo"
import { FacilityManagement } from "../models/FacilityManagement";

class FacilityManagementController {
    // create FacilityManagement object (Controller)
    async create(req: Request, res: Response) {
        try {
           
            const savedFacilityManagement = await new FacilityManagementRepo().save(req.body);
            res.status(201).json({
                status: "Created!",
                message: "Successfully created FacilityManagement!",
                data: savedFacilityManagement,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }
  // update FacilityManagement object (Controller)
    // async update(req: Request, res: Response) {
    //     try {
            
    //         console.log('req.body',req.body)
           

    //         const updatedFacilityManagement = await new FacilityManagementRepo().update(req.body);
    //         res.status(200).json({
    //             status: "Ok!",
    //             message: "Successfully updated FacilityManagement data!",
    //             data: updatedFacilityManagement,
    //         });
    //     } catch (err) {
    //         res.status(500).json({
    //             status: "Internal Server Error!",
    //             message: "Internal Server Error! " + err,
    //         });
    //     }
    // }
 

    // delete FacilityManagement object (Controller)

    async delete(req: Request, res: Response) {
        try {
            const deletedFacilityManagement = await new FacilityManagementRepo().delete(
                parseInt(req.params["facilitymanagementId"]),
                req.body.deletedBy
            );
            res.status(200).json({
                status: "Ok!",
                message: "Successfully deleted FacilityManagement!",
                data: deletedFacilityManagement,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }
}

export default new FacilityManagementController();
