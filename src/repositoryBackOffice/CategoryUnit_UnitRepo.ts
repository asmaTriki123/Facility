import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";
interface ICategoryUnit_Unit {
    save(categoryUnitUnit: CategoryUnitUnit): Promise<CategoryUnitUnit>;
  
} 

export class CategoryUnit_UnitRepo implements ICategoryUnit_Unit {

       async save(categoryUnitUnit: CategoryUnitUnit): Promise<CategoryUnitUnit> {
            try {
                const savedCategoryUnitUnit = await CategoryUnitUnit.create({
                   
                    categoryUnitId: categoryUnitUnit.categoryUnitId,
                    unitId: categoryUnitUnit.unitId,
                    createdBy: categoryUnitUnit.createdBy,
                    isDeleted: false,
                    createdAt: new Date(),
                   
                });
                return savedCategoryUnitUnit;
            } catch (error) {
                throw new Error("Failed to create CategoryUnitUnit! " + error);
            }
        }

      async update(categoryUnitUnit: CategoryUnitUnit): Promise<CategoryUnitUnit> {
    try {
        const existingRecord = await CategoryUnitUnit.findOne({
            where: {
                unitId: categoryUnitUnit.unitId
            }
        });

        if (!existingRecord) {
            throw new Error("CategoryUnitUnit not found!");
        }

        // Mise à jour des champs
        existingRecord.categoryUnitId = categoryUnitUnit.categoryUnitId;
        existingRecord.updatedBy = categoryUnitUnit.updatedBy;
        existingRecord.updatedAt = new Date();

        await existingRecord.save();
        
        return existingRecord;
    } catch (error) {
        console.error(error); // Log l'erreur pour le débogage
        throw new Error(`Failed to update categoryUnitUnit: ${error}`);
    }
}
        
}