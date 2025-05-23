import { Request, Response } from "express";
import { TypeUnit } from "../models/TypeUnit";
import { TypeUnitRepository } from "../repositoryBackOffice/TypeUnitRepo";
class TypeUnitController {
  // create TypeUnit object (Controller)
  async create(req: Request, res: Response) {
    console.log('create type unit', req.file);
    try {

      const newTypeUnit = new TypeUnit();
      newTypeUnit.typeUnitLength = req.body.typeUnitLength;
      newTypeUnit.typeUnitWidth = req.body.typeUnitWidth;
      newTypeUnit.typeUnitHeight = req.body.typeUnitHeight;
      newTypeUnit.typeUnitName = req.body.typeUnitName;
      newTypeUnit.typeUnitDescription = req.body.typeUnitDescription;
      newTypeUnit.typeUnitPriceMonthly = req.body.typeUnitPriceMonthly;
      newTypeUnit.typeUnitPriceDaily = req.body.typeUnitPriceDaily;
      newTypeUnit.typeUnitPhoto = req.file ? `${req.file.filename}` : null;
      newTypeUnit.createdBy = req.body.createdBy;
      newTypeUnit.createdByCompany = req.body.createdByCompany;

      const savedTypeUnit = await new TypeUnitRepository().save(newTypeUnit);

      res.status(201).json({
        status: "Created! ",
        message: "Successfully created typeUnit!",
        data: savedTypeUnit,

      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }
  // update TypeUnit object (Controller)

  async update(req: Request, res: Response) {
    try {
console.log("req.body",req.body)
      const new_typeunit = new TypeUnit();
      console.log('req.file',req.file)
      new_typeunit.typeUnitId = parseInt(req.params["typeUnitId"]);
      new_typeunit.typeUnitName = req.body.typeUnitName;
      new_typeunit.typeUnitDescription = req.body.typeUnitDescription;
      new_typeunit.typeUnitHeight = req.body.typeUnitHeight;
      new_typeunit.typeUnitLength = req.body.typeUnitLength;
      new_typeunit.typeUnitPriceMonthly = req.body.typeUnitPriceMonthly;
      new_typeunit.typeUnitPriceDaily = req.body.typeUnitPriceDaily;
      new_typeunit.typeUnitWidth = req.body.typeUnitWidth;
      new_typeunit.typeUnitPhoto = req.file ? `${req.file.filename}` : null;
      new_typeunit.updatedBy = req.body.updatedBy;
      const updatedTypeUnit = await new TypeUnitRepository().update(new_typeunit);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully updated Type unit data!",
        data: updatedTypeUnit,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }
  // findAllByCreatedBy TypeUnit object (Controller)

  async findAll(req: Request, res: Response) {
    try {
      console.log('type unit created BY ',req.body)
      const typeUnits = await new TypeUnitRepository().retrieveAll(req.params["companyId"]);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched TypeUnit data!",
        data: typeUnits,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Internal Server Error: ${err}`,
      });
    }
  }
  // delete TypeUnit object (Controller)

  async delete(req: Request, res: Response) {
    try {

      const isAssociated = await new TypeUnitRepository().isTypeUnitAssociatedWithUnit(parseInt(req.params["typeUnitId"]));
      console.log('id type unit',parseInt(req.params["typeUnitId"]))

      console.log('type unit asocier a  unit ',isAssociated)
      if (isAssociated) {
        res.status(400).json({
          status: "Bad Request",
          message: `Cannot delete this unit type ${parseInt(req.params["typeUnitId"])} as it is associated with active units. Please delete or dissociate the associated units first.`,
        });
      } else {

      const result = await new TypeUnitRepository().delete(parseInt(req.params["typeUnitId"]), req.body.deletedBy);


      res.status(200).json({
        status: "Ok",
        message: `TypeUnit with ID ${parseInt(req.params["typeUnitId"])} has been marked as deleted.`,
        data: result,
      });
    }


    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Error deleting TypeUnit: ${error}`,
      });
    }
  }



  async getTypeUnitsByCompanyId(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params; // Récupérer l'ID de l'entreprise depuis les paramètres de la requête

      if (!companyId) {
        res.status(400).json({ message: "L'ID de l'entreprise est requis." });
        return;
      }

      // Appeler le repository pour récupérer les TypeUnit
      const typeUnits = await new TypeUnitRepository().getTypeUnitsByCompanyId(companyId);

      res.status(200).json(typeUnits);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error });
    }
  }

  async getAllTypeUnitByFacility (req: Request, res: Response){
 try {
      
      const typeUnits = await new TypeUnitRepository().retrieveAll(req.params["createdBy"]);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched TypeUnit data!",
        data: typeUnits,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: `Internal Server Error: ${err}`,
      });
    }
  }

async getTypeUnitbyCatgeory(req: Request, res: Response) {
    try {
        const typeUnitsByCategory = await new TypeUnitRepository().retrieveAllByCategory(req.params["categoryUnitId"]);
        
        res.status(200).json({
            status: "Ok!",
            message: "Successfully fetched TypeUnit By Category data!",
            data: typeUnitsByCategory,
        });
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: `Internal Server Error: ${err}`,
        });
    }
}
/*
  public async getTypeUnitbyRent(req: Request, res: Response): Promise<void> {
    try {
        const { categoryUnitId, typeUnitId, rentMoveIn, rentMoveOut } = req.params;
        
        const moveInDate = new Date(decodeURIComponent(rentMoveIn));
        const moveOutDate = new Date(decodeURIComponent(rentMoveOut));

       

        const typeUnitsByRent = await new TypeUnitRepository().retrieveAllByRent(
            Number(categoryUnitId),
            Number(typeUnitId),
            moveInDate,
            moveOutDate
        );

        res.status(200).json({
            status: "success",
            data: typeUnitsByRent
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}*/

public async getTypeUnitbyRent(req: Request, res: Response): Promise<void> {
    try {
        const { categoryUnitId, typeUnitIds, rentMoveIn, rentMoveOut } = req.params;
        
        const moveInDate = new Date(decodeURIComponent(rentMoveIn));
        const moveOutDate = new Date(decodeURIComponent(rentMoveOut));

        const typeUnitIdArray = typeUnitIds.split(',').map(Number);

        const { typeUnits, hasPending } = await new TypeUnitRepository().retrieveAllByRent(
            Number(categoryUnitId),
            typeUnitIdArray,
            moveInDate,
            moveOutDate
        );

        res.status(200).json({
            status: "success",
            data: {
                typeUnits,
                message: hasPending ? "Certaines unités sont en attente de disponibilité" : null
            }
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}
}


export default new TypeUnitController();