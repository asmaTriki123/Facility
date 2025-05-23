import { TimeZoneService } from "../middleware/TimeZone";
import { CategoryUnit } from "../models/CategoryUnit";
import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";
import { Unit } from "../models/Unit";
import { User } from "../models/User";
import { UnitRepository } from "./UnitRepo";
import { Op } from "sequelize";
interface ICategoryUnitRepo{
save(categoryUnit: CategoryUnit): Promise<CategoryUnit>;
update(categoryUnit: CategoryUnit): Promise<CategoryUnit>;
getCategoryUnit(createdBy : number) : Promise<CategoryUnit[]>;
retrieveAll(): Promise<CategoryUnit[]>
}

export class CategoryUnitRepo implements ICategoryUnitRepo {

async save(categoryUnit: CategoryUnit): Promise<CategoryUnit>{
try {
            const savedCategoryUnits = await CategoryUnit.create({
                categoryUnitName: categoryUnit.categoryUnitName,
                createdBy: categoryUnit.createdBy,
                isDeleted: false,
                createdAt:new Date() ,
            });
            return savedCategoryUnits;
        } catch (error) {
            throw new Error("Failed to create CategoryUnit! " + error);
        }
}


async update(categoryUnit: CategoryUnit): Promise<CategoryUnit> {
        try {
            const existingCatgeoryUnit= await CategoryUnit.findOne({
                where: { categoryUnitId: categoryUnit.categoryUnitId },
            });
            if (!existingCatgeoryUnit) {
                throw new Error("CategoryUnit not found!");
            }
            existingCatgeoryUnit.categoryUnitName = categoryUnit.categoryUnitName;
            existingCatgeoryUnit.updatedBy = categoryUnit.updatedBy;
            existingCatgeoryUnit.updatedAt = new Date();
         
            await existingCatgeoryUnit.save();
            return existingCatgeoryUnit;
        } catch (error) {
            throw new Error("Failed to update CategoryUnit! " + error);
        }
    }

async getCategoryUnit(createdBy : number) : Promise<CategoryUnit[]>{
try {
            return await CategoryUnit.findAll({
                where: {
                    isDeleted: false,
                    createdBy: createdBy
                },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all CategoryUnit: ${error}`);
        }
}


async deleteUnitCategory(categoryUnitId: number, deletedBy: number): Promise<CategoryUnit> {

  const categoryUnit = await CategoryUnit.findOne({
    where: { categoryUnitId },
  });

  if (!categoryUnit) {
    throw new Error("The CategoryUnit does not exists");
  }

  // Si la CategoryUnit est déjà supprimée
  if (categoryUnit.isDeleted) {
    throw new Error("The CategoryUnit has already been deleted");
  }
  // Vérifier si la CategoryUnit est associée à une unité dans la table CategoryUnitUnit
  const existsInCategoryUnitUnit = await CategoryUnitUnit.findOne({
    where: {
    categoryUnitId: categoryUnitId,
    isDeleted: false, 
  },
  });

  if (existsInCategoryUnitUnit) {
    throw new Error("The CategoryUnit is associated with a unit and cannot be deleted");
  }

  // Si la CategoryUnit n'est pas associée à une unité et n'est pas encore supprimée
  categoryUnit.isDeleted = true;
  categoryUnit.deletedBy = deletedBy; 
  await categoryUnit.save();
  return categoryUnit;
}


    async retrieveAll(): Promise<CategoryUnit[]> {
        try {
            return await CategoryUnit.findAll({
                where: {
                    isDeleted: false

                },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all CategoryUnit: ${error}`);
        }
    }


}

