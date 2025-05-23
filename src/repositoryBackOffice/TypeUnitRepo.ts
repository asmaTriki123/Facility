import { DeleteAncienImage } from "../middleware/DeleteAncienImage";
import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";
import { Rent } from "../models/Rent";
import { TypeUnit } from "../models/TypeUnit";
import { Unit } from "../models/Unit";
import { User } from "../models/User";
import { Op, where } from "sequelize";
import { PhotoUnit } from "../models/PhotoUnit";
interface ITypeUnit {
  save(typeUnit: TypeUnit): Promise<TypeUnit>;
  update(typeUnit: TypeUnit): Promise<TypeUnit>
  retrieveAll(createdBy: string): Promise<TypeUnit[]>
  isTypeUnitAssociatedWithUnit(typeUnitId: number): Promise<boolean>
  delete(typeUnitId: number, deletedBy: string): Promise<TypeUnit>
retrieveAllByCategory (categoryUnitId: string) : Promise<TypeUnit[]>
 //retrieveAllByRent(categoryUnitId: number, typeUnitId: number, rentMoveIn: Date, rentMoveOut: Date): Promise<TypeUnit[]>
retrieveAllByRent(categoryUnitId: number, typeUnitIds: number[], rentMoveIn: Date, rentMoveOut: Date): Promise<{typeUnits: TypeUnit[], hasPending: boolean}>
}

export class TypeUnitRepository implements ITypeUnit {
  // create typeUnit object (Repo)
  async save(typeUnit: TypeUnit): Promise<TypeUnit> {
    const Photo = typeUnit.typeUnitPhoto || 'TypeUnit.PNG';

    try {
      const savedTypeUnit = await TypeUnit.create({
        typeUnitLength: typeUnit.typeUnitLength,
        typeUnitWidth: typeUnit.typeUnitWidth,
        typeUnitHeight: typeUnit.typeUnitHeight,
        typeUnitName: typeUnit.typeUnitName,
        typeUnitDescription: typeUnit.typeUnitDescription,
        typeUnitPriceMonthly: typeUnit.typeUnitPriceMonthly,
        typeUnitPriceDaily: typeUnit.typeUnitPriceDaily,
        typeUnitPhoto: Photo,
        createdBy: typeUnit.createdBy,
        createdByCompany: typeUnit.createdByCompany,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return savedTypeUnit;
    } catch (error) {
      throw new Error("Failed to create type unit!" + error);
    }
  }
  // update typeUnit object (Repo) 
  async update(typeUnit: TypeUnit): Promise<TypeUnit> {
    try {
      console.log('repo update type unit', typeUnit)
      const existingTypeUnit = await TypeUnit.findOne({
        where: {
          typeUnitId: typeUnit.typeUnitId,
        },
      });

      if (!existingTypeUnit) {
        throw new Error("TypeUnit not found!");
      }
      const deleteImageHelper = new DeleteAncienImage();

      await deleteImageHelper.deleteOldImageIfNeeded(typeUnit.typeUnitPhoto, existingTypeUnit.typeUnitPhoto, ["TypeUnit.png"]);

      existingTypeUnit.typeUnitLength = typeUnit.typeUnitLength;
      existingTypeUnit.typeUnitWidth = typeUnit.typeUnitWidth;
      existingTypeUnit.typeUnitHeight = typeUnit.typeUnitHeight;
      existingTypeUnit.typeUnitName = typeUnit.typeUnitName;
      existingTypeUnit.typeUnitDescription = typeUnit.typeUnitDescription;
      existingTypeUnit.typeUnitPriceMonthly = typeUnit.typeUnitPriceMonthly;
      existingTypeUnit.typeUnitPriceDaily = typeUnit.typeUnitPriceDaily;
      existingTypeUnit.typeUnitPhoto = typeUnit.typeUnitPhoto ? typeUnit.typeUnitPhoto : existingTypeUnit.typeUnitPhoto;
      existingTypeUnit.updatedBy = typeUnit.updatedBy;

      return await existingTypeUnit.save();

    } catch (error) {
      throw new Error("Failed to update TypeUnit!" + error);
    }
  }
  // findAllBy createdBy by typeUnitId object (Repo)

  async retrieveAll(createdByCompany: string): Promise<TypeUnit[]> {
    try {

      return await TypeUnit.findAll({
        where: {
          isDeleted: false,
          createdByCompany: createdByCompany
        }
      });
    } catch (error) {
      throw new Error(`Failed to retrieve TypeUnits: ${error}`);
    }
  }

  // count unit by typeUnitId object (Repo)
  async isTypeUnitAssociatedWithUnit(typeUnitId: number): Promise<boolean> {
    const unitCount = await Unit.count({
      where: {
        typeUnitId,
        isDeleted: false,
      },
    });
    console.log("typeunit is ", typeUnitId, "est associer a", unitCount, " unit ")

    return unitCount > 0;
  }
  // delete TypeUnit object (Repo)

  async delete(typeUnitId: number, deletedBy: string): Promise<TypeUnit> {
    try {

      const typeUnit = await TypeUnit.findByPk(typeUnitId);


      if (!typeUnit) {
        throw new Error("Type Unit not found!");
      }
      typeUnit.isDeleted = true;
      typeUnit.deletedBy = deletedBy;
      typeUnit.deletedAt = new Date();

      return await typeUnit.save();
    } catch (error) {

      throw new Error(` Error  deleting typeUnit : ${error}`);
    }
  }

  async getTypeUnitsByCompanyId(companyId: string): Promise<TypeUnit[]> {
    try {
      // Récupérer les utilisateurs de l'entreprise
      const users = await User.findAll({
        where: {
          companyId: companyId, // Filtrer par companyId
        },
        attributes: ["userId"], // On ne récupère que les userId
      });

      // Extraire les userIds des utilisateurs
      const userIds = users.map((user) => user.userId);

      // Récupérer les TypeUnit créés par ces utilisateurs
      const typeUnits = await TypeUnit.findAll({
        where: {
          createdBy: {
            [Op.in]: userIds, // Filtrer par les userIds récupérés
          },
        },
      });

      return typeUnits;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des TypeUnit: ${error}`);
    }
  }


async retrieveAllByCategory(categoryUnitId: string): Promise<TypeUnit[]> {
    const categoryUnitUnits = await CategoryUnitUnit.findAll({
        where: {
            categoryUnitId: categoryUnitId,
            isDeleted: false
        },
        include: [{
            model: Unit,
            where: { isDeleted: false },
            include: [{
                model: TypeUnit
            }]
        }]
    });

    // 2. Extraire les TypeUnit uniques
    const typeUnits: TypeUnit[] = [];
    const typeUnitIds = new Set<number>();

    for (const categoryUnitUnit of categoryUnitUnits) {
        if (categoryUnitUnit.unit && 
            categoryUnitUnit.unit.typeUnit && 
            !typeUnitIds.has(categoryUnitUnit.unit.typeUnit.typeUnitId)) {
            
            typeUnitIds.add(categoryUnitUnit.unit.typeUnit.typeUnitId);
            typeUnits.push(categoryUnitUnit.unit.typeUnit);
        }
    }

    return typeUnits;
}
/*
async retrieveAllByRent(categoryUnitId: number, typeUnitId: number, rentMoveIn: Date, rentMoveOut: Date): Promise<TypeUnit[]> {
  // 1. Récupérer toutes les unités de la catégorie et type
  const units = await Unit.findAll({
    include: [
      {
        model: CategoryUnitUnit,
        where: { categoryUnitId, isDeleted: false },
        required: true
      },
      {
        model: TypeUnit,
        where: { typeUnitId },
        required: true
      }
    ],
    where: { isDeleted: false }
  });

  // 2. Vérifier la disponibilité
  const availableUnits = await Promise.all(units.map(async (unit) => {
    const rents = await Rent.findAll({
      where: { unitId: unit.unitId, isDeleted: false },
      order: [['rentMoveOut', 'DESC']]
    });

    if (rents.length === 0) return unit; // Pas de réservation → disponible
    
    const lastRent = rents[0];
    if (!lastRent.rentMoveOut) return null; // Réservation permanente → indisponible
    
    return new Date(rentMoveIn) > new Date(lastRent.rentMoveOut) ? unit : null;
  }));

  // 3. Filtrer les unités disponibles
  const availableUnitIds = availableUnits
    .filter((unit): unit is Unit => unit !== null)
    .map(unit => unit.unitId);

  // 4. Retourner les TypeUnits avec les unités disponibles
  return TypeUnit.findAll({
    where: { typeUnitId },
    include: [{
      model: Unit,
      where: { unitId: { [Op.in]: availableUnitIds } },
      required: true,
      include: [{
          model: PhotoUnit,
          where: { isDeleted: false },
          required: false
        }]
    }]
  });
}*/
/*
async retrieveAllByRent(categoryUnitId: number, typeUnitIds: number[], rentMoveIn: Date, rentMoveOut: Date): Promise<{typeUnits: TypeUnit[], hasPending: boolean}> {
  // 1. Récupérer toutes les unités des types demandés
  const units = await Unit.findAll({
    include: [
      {
        model: CategoryUnitUnit,
        where: { categoryUnitId, isDeleted: false },
        required: true
      },
      {
        model: TypeUnit,
        where: { typeUnitId: { [Op.in]: typeUnitIds } },
        required: true
      }
    ],
    where: { isDeleted: false }
  });

  // 2. Vérifier la disponibilité selon la logique originale
  const availableUnits = await Promise.all(units.map(async (unit): Promise<{ unit: Unit, status: 'available' } | null> => {
    const rents = await Rent.findAll({
      where: { unitId: unit.unitId, isDeleted: false },
      order: [['rentMoveOut', 'DESC']]
    });

    if (rents.length === 0) return { unit, status: 'available' };
    
    const lastRent = rents[0];
    if (!lastRent.rentMoveOut) return null;
    
    return new Date(rentMoveIn) > new Date(lastRent.rentMoveOut) 
      ? { unit, status: 'available' } 
      : null;
  }));

  // 3. Si aucune unité disponible, chercher les unités "en attente"
  let pendingUnits: { unit: Unit, status: 'pending' }[] = [];
  const availableUnitIds = availableUnits
    .filter((item): item is { unit: Unit, status: 'available' } => item !== null)
    .map(item => item.unit.unitId);

  if (availableUnitIds.length === 0) {
    const pendingResults = await Promise.all(units.map(async (unit): Promise<{ unit: Unit, status: 'pending' } | null> => {
      const rents = await Rent.findAll({
        where: { unitId: unit.unitId, isDeleted: false },
        order: [['rentMoveOut', 'DESC']]
      });

      if (rents.length === 0) return null;
      
      const lastRent = rents[0];
      if (!lastRent.rentMoveOut || new Date(rentMoveIn) <= new Date(lastRent.rentMoveOut)) {
        return { unit, status: 'pending' };
      }
      return null;
    }));
    
    pendingUnits = pendingResults.filter((item): item is { unit: Unit, status: 'pending' } => item !== null);
  }

  // 4. Préparer les IDs des unités à inclure
  const unitIdsToInclude = [
    ...availableUnitIds,
    ...pendingUnits.map(u => u.unit.unitId)
  ];

  // 5. Récupérer les TypeUnits avec les unités
  const typeUnits = await TypeUnit.findAll({
    where: { typeUnitId: { [Op.in]: typeUnitIds } },
    include: [{
      model: Unit,
      where: { unitId: { [Op.in]: unitIdsToInclude } },
      required: true,
      include: [{
        model: PhotoUnit,
        where: { isDeleted: false },
        required: false
      }]
    }]
  });

  // 6. Marquer le statut des unités
  typeUnits.forEach(typeUnit => {
    typeUnit.unit.forEach(unit => {
      if (pendingUnits.some(pu => pu.unit.unitId === unit.unitId)) {
        unit.dataValues.availabilityStatus = 'pending';
      } else {
        unit.dataValues.availabilityStatus = 'available';
      }
    });
  });

  return {
    typeUnits,
    hasPending: pendingUnits.length > 0
  };
}*/

async retrieveAllByRent(
  categoryUnitId: number,
  typeUnitIds: number[],
  rentMoveIn: Date,
  rentMoveOut: Date
): Promise<{ typeUnits: TypeUnit[], hasPending: boolean }> {
  // 1. Récupérer toutes les unités des types demandés
  const units = await Unit.findAll({
    include: [
      {
        model: CategoryUnitUnit,
        where: { categoryUnitId, isDeleted: false },
        required: true
      },
      {
        model: TypeUnit,
        where: { typeUnitId: { [Op.in]: typeUnitIds } },
        required: true
      }
    ],
    where: { isDeleted: false }
  });

  // 2. Filtrer les unités disponibles uniquement
  const availableUnits = await Promise.all(units.map(async (unit): Promise<Unit | null> => {
    const rents = await Rent.findAll({
      where: { unitId: unit.unitId },
      order: [['rentMoveOut', 'DESC']]
    });

    const activeRents = rents.filter(r => !r.isDeleted);

    if (activeRents.length === 0) {
      // Toutes les locations sont supprimées ou inexistantes → unité disponible
      return unit;
    }

    const lastRent = activeRents[0];
    if (!lastRent.rentMoveOut) return null;

    return new Date(rentMoveIn) > new Date(lastRent.rentMoveOut) ? unit : null;
  }));

  // 3. Extraire les IDs des unités disponibles
  const availableUnitIds = availableUnits
    .filter((u): u is Unit => u !== null)
    .map(u => u.unitId);

  // 4. Si aucune unité disponible, retourner une liste vide
  if (availableUnitIds.length === 0) {
    return {
      typeUnits: [],
      hasPending: false
    };
  }

  // 5. Récupérer les TypeUnits avec les unités disponibles
  const typeUnits = await TypeUnit.findAll({
    where: { typeUnitId: { [Op.in]: typeUnitIds } },
    include: [{
      model: Unit,
      where: { unitId: { [Op.in]: availableUnitIds } },
      required: true,
      include: [{
        model: PhotoUnit,
        where: { isDeleted: false },
        required: false
      }]
    }]
  });

  // 6. Marquer les unités comme "available"
  typeUnits.forEach(typeUnit => {
    typeUnit.unit.forEach(unit => {
      unit.dataValues.availabilityStatus = 'available';
    });
  });

  return {
    typeUnits,
    hasPending: false
  };
}

}