import { Request, Response } from "express";
import { CategoryUnit_UnitRepo } from "../repositoryBackOffice/CategoryUnit_UnitRepo";
import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";
class  CategoryUnitUnitController{
 async create (req: Request, res: Response) {
         try {
                   
                    const savedCategoryUnit = await new CategoryUnit_UnitRepo().save(req.body);
                    res.status(201).json({
                        status: "Created!",
                        message: "Successfully created CategoryUnit_Unit!",
                        data: savedCategoryUnit,
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
   
               const new_categoryUnit= new CategoryUnitUnit();
                new_categoryUnit.unitId = parseInt(req.params["unitId"]);
                new_categoryUnit.categoryUnitId = req.body.categoryUnitId,
               new_categoryUnit.updatedBy = req.body.updatedBy;
               const new_updateCoordinate = await new CategoryUnit_UnitRepo().update(new_categoryUnit);
               res.status(200).json({
                   status: "Ok! ",
                   message: "Successfully updated Category Unit data!",
                   data: new_updateCoordinate
               });
           } catch (err) {
               res.status(500).json({
                   status: "Internal Server Error! ",
                   message: "Internal Server Error!" + err,
               });
           }
       }
       

}
export default new CategoryUnitUnitController();