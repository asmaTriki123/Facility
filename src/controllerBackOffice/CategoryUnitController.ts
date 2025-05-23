import { Request, Response } from "express";
import { CategoryUnit } from "../models/CategoryUnit";
import { CategoryUnitRepo } from "../repositoryBackOffice/CategoryUnitRepo";
import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";

class CategoryUnitController {

  async create(req: Request, res: Response) {
    try {

      const savedCategoryUnit = await new CategoryUnitRepo().save(req.body);
      res.status(201).json({
        status: "Created!",
        message: "Successfully created CategoryUnit!",
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
      const updated_categoryunit = new CategoryUnit();
      updated_categoryunit.categoryUnitId = parseInt(req.params["categoryUnitId"]);
      updated_categoryunit.updatedBy = req.body.updatedBy;
      updated_categoryunit.categoryUnitName = req.body.categoryUnitName;
      const updated_categoryUnit = await new CategoryUnitRepo().update(updated_categoryunit);
      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated CategoryUnit data!",
        data: updated_categoryUnit,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error! " + err,
      });
    }
  }

  async getByCreatedBy(req: Request, res: Response) {
    try {
      const existingCategoryUnit = await new CategoryUnitRepo().getCategoryUnit(parseInt(req.params["createdBy"]));
      res.status(200).json({
        status: "Success",
        data: existingCategoryUnit,
      });
    } catch (error) {
      console.error("Error retrieving CatgeoryUnit:", error);
      res.status(500).json({
        status: "Internal Server Error",
        message: "An error occurred while fetching the facility",
      });
    }
  }



  async delete(req: Request, res: Response) {
    try {
      const categoryUnit = await new CategoryUnitRepo().deleteUnitCategory(parseInt(req.params.categoryUnitId), req.body.deletedBy);

      res.status(200).json({
        message: 'CategoryUnit supprimée avec succès',
        data: categoryUnit,
      });
    } catch (error) {

      res.status(500).json({
        message: "  "+error,
      });

    }
  }


  async getAllCategory(req: Request, res: Response) {
    try {
      const CategoryList = await new CategoryUnitRepo().retrieveAll();
      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all Category data!",
        data: CategoryList,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error! " + err,
      });
    }
  }

}

export default new CategoryUnitController();