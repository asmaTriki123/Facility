import UnitRouter from "../routerBackoffice/UnitRouter";
import { Request, Response } from "express";
import { Unit } from "../models/Unit";
import { UnitRepository } from "../repositoryBackOffice/UnitRepo";
import { PhotoUnit } from "../models/PhotoUnit";
import { PhotosFacility } from "../models/PhotosFacility";
import { Facility } from "../models/Facility";
class UnitController {

  async createUnit(req: Request, res: Response): Promise<void> {
    try {
      const newUnit = new Unit();
      newUnit.unitName = req.body.unitName;
      newUnit.unitNotes = req.body.unitNotes ; 
      newUnit.unitStatus = req.body.unitStatus;
      newUnit.createdBy = req.body.createdBy;
      newUnit.facilityId = req.body.facilityId;
      newUnit.typeUnitId = req.body.typeUnitId; 
      const savedUnit = await new UnitRepository().save(newUnit);
      res.status(201).json({
        status: "Created",
        message: "Successfully created the unit!",
        data: savedUnit,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!" + err,
      });
    }
  }

  async updateUnit ( req: Request, res: Response) : Promise <void>{
    try {
  const new_unit = new Unit();
  new_unit.unitId = parseInt(req.params["unitId"])
  new_unit.unitName = req.body.unitName;
  new_unit.facilityId =  req.body.facilityId;
  new_unit.unitNotes = req.body.unitNotes;
  new_unit.unitStatus = req.body.unitStatus;
  new_unit.typeUnitId = req.body.typeUnitId;
  new_unit.updatedBy = req.body.updatedBy;

  const updatedUnit = await new  UnitRepository().update(new_unit);
   res.status(200).json({
        status: "Ok! ",
        message: "Successfully updated Type unit data!",
      data: updatedUnit, 
      });}
      catch(err){
       res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
      }
  }



 async getUnit(req: Request, res: Response): Promise<void> {
    try {
      const existingUnit = await new UnitRepository().getUnit(parseInt(req.params["unitId"]));
  
       res.status(200).json({
        status: "Success",
        data: existingUnit,
      });
    } catch (error) {
      console.error("Error retrieving unit:", error);
       res.status(500).json({
        status: "Internal Server Error",
        message: "An error occurred while fetching the unit",
      });
    }
  }

async getAllUnitByfacility(req: Request, res: Response): Promise<void> {
  try {
   
    const existingUnits = await new UnitRepository().getAllUnitByfacilityId(parseInt(req.params["facilityId"]));   

    res.status(200).json({
      status: "Success",
      data: existingUnits,
    });
  } catch (error) {
    console.error("Error retrieving units by facilityId:", error);
    if (!res.headersSent) { 
      res.status(500).json({
        status: "Internal Server Error",
        message: "An error occurred while getting the units",
      });
    }
  }
}

//get unit and photos 
async getUnitsAndhotos(req: Request, res: Response): Promise<void> {
  try {
    
    const existingUnit = await new UnitRepository().getUnitAndPhoto(parseInt(req.params["unitId"]));

    res.status(200).json({
      status: "Success",
      data: existingUnit,
    });
  } catch (error) {
    console.error("Error retrieving unit:", error); 
    res.status(500).json({
      status: "Internal Server Error",
      message: "An error occurred while getting the unit",
    });
  }
}

async deleteUnit(req: Request, res: Response) {
    try {
      const unit = await new UnitRepository().deleteUnit(parseInt(req.params.unitId),req.body.deletedBy);
     res.status(200).json({
      message: "L'unité et ses photos ont été supprimées avec succès",
      data: unit  
    });
    } catch (error) {
      console.error(error);
       res.status(500).send(error || 'Une erreur est survenue');
    }
  }
async getUnitByIdFacility (req: Request, res: Response): Promise<void> {
    try {
   
      const existingUnit = await new UnitRepository().getUnitByIdFacility(parseInt(req.params["facilityId"]), parseInt(req.params["unitId"]));
       res.status(200).json({
        status: "Success",
        data: existingUnit,
      });
    } catch (error) {
      console.error("Error retrieving unit:", error);
       res.status(500).json({
        status: "Internal Server Error",
        message: "An error occurred while getting the unit",
      });
    }
  }


async getSortTypeUnit(req: Request, res: Response): Promise<void> {
    try {
    

        const existingUnit = await new UnitRepository().getSortTypeUnitRepo(parseInt(req.params["facilityId"]));
        
        if (!existingUnit) {
             res.status(404).json({
                status: "Not Found",
                message: "No units found for this facility"
            });
        }

        res.status(200).json({
            status: "Success",
            data: existingUnit,
        });
    } catch (error) {
        console.error("Error retrieving unit:", error);
        res.status(500).json({
            status: "Internal Server Error",
            message: "An error occurred while getting the unit",
        });
    }
}

  
}

export default new UnitController ();