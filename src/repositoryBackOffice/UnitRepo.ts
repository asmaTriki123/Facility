import { CreatedAt, UpdatedAt } from "sequelize-typescript";
import { Unit } from "../models/Unit";
import { TypeUnit } from "../models/TypeUnit";
import { PhotoUnit } from "../models/PhotoUnit";
import { TimeZoneService } from "../middleware/TimeZone";
import { CategoryUnit } from "../models/CategoryUnit";
import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";
import { AmenitiesUnit } from "../models/AmenitiesUnit";
import { UnitSpecificAmenities } from "../models/UnitSpecificAmenities";

interface Iunit {
  save(unit: Unit): Promise<Unit>;
  update(unit: Unit): Promise<Unit>;
  getUnit(unitId: number): Promise<Unit | null>
  getAllUnitByfacilityId(facilityId: number): Promise<Unit[]>
  deleteUnit(unitId: number, deletedBy: string): Promise<Unit>
  getAllUnitByfacilityId(facilityId: number): Promise<Unit[]>
  getUnitByIdFacility(unitId: number, facilityId: number): Promise<Unit | null>
}

export class UnitRepository implements Iunit {
  // save unit object  (Repo)

  async save(unit: Unit): Promise<Unit> {
    try {
      const savedUnit = await Unit.create({
        unitName: unit.unitName,
        unitNotes: unit.unitNotes,
        unitStatus: unit.unitStatus,
        createdBy: unit.createdBy,
        facilityId: unit.facilityId,
        typeUnitId: unit.typeUnitId,
        createdAt: await new TimeZoneService().getAdjustedTime(unit.facilityId),
        isDeleted: false,
      });

      return savedUnit;
    } catch (error) {
      throw new Error("Failed to create unit!" + error);
    }
  }

  async update(unit: Unit): Promise<Unit> {
    try {
      const existingUnit = await Unit.findOne({
        where: {
          unitId: unit.unitId,
        },
      });


      if (!existingUnit) {
        throw new Error("Unit not found!");
      }
console.log(" existingUnit", existingUnit)
      existingUnit.unitName = unit.unitName;
      existingUnit.unitNotes = unit.unitNotes;
      existingUnit.unitStatus = unit.unitStatus;
      existingUnit.updatedBy = unit.updatedBy;
      existingUnit.typeUnitId = unit.typeUnitId;
      existingUnit.updatedAt = await new TimeZoneService().getAdjustedTime(existingUnit.facilityId) ?? existingUnit.updatedAt;
      // Save the updated TypeUnit object
      await existingUnit.save();
      return existingUnit;
    }
    catch (error) {
      throw new Error("Failed to update Unit!" + error);
    }
  }



async getUnit(unitId: number): Promise<Unit | null> {
    try {
      const existingUnit = await Unit.findOne({
        where: {
          isDeleted: false,
          unitId: unitId,
        },
        include: [
          {
            model: TypeUnit,
            as: 'typeUnit',
            required: false
          },
          {
            model: PhotoUnit,
            as: 'photoUnit',
            required: false,
          
          },
          {
            model: AmenitiesUnit,
            as: 'amenitiesUnit', // Doit correspondre à @HasMany(() => AmenitiesUnit) amenitiesUnit
            required: false,
            where: {
              isDeleted: false
            },
            include: [{
              model: UnitSpecificAmenities,
              as: 'unitSpecificAmenities', // Vérifiez l'alias dans votre modèle AmenitiesUnit
              required: false,
              where: {
                isDeleted: false
              }
            }]
          },
          {
            model: CategoryUnit,
            as: 'categoryUnits', // Doit correspondre à @BelongsToMany(() => CategoryUnit) categoryUnits
            required: false,
            where: {
              isDeleted: false
            },
            through: { 
              attributes: [] 
            }
          }
        ]
      });

      if (!existingUnit) {
        throw new Error("Unit not found!");
      }
      return existingUnit;
    } catch (error) {
      throw new Error("Error fetching unit: " + error);
    }
}

  async getAllUnitByfacilityId(facilityId: number): Promise<Unit[]> {
    try {

      const units = await Unit.findAll({
        where: {
          facilityId: facilityId,
        },
         include: [
          {
            model: TypeUnit,
            where: {
              isDeleted: false,
            },
            required: false,
          }]
      });
      return units;
    } catch (error) {
      throw new Error("Error fetching units: " + error);
    }
  }

// get unit and photos before the category (it works )
  async getUnitAndPhoto(unitId: number): Promise<Unit | null> {
    try {
      // Récupérer les unités avec leurs photos associées
      const existingUnits = await Unit.findOne({
        where: {
          unitId: unitId,
          isDeleted: false,
        },
        include: [
          {
            model: PhotoUnit,
            where: {
              unitId: unitId,
              isDeleted: false,
            },
            required: false,
          },
           {
            model: CategoryUnit,
            where: {
              isDeleted: false,
            },
            required: false,
          },
          

        ]
      });

      return existingUnits; // Retourner les unités et leurs photos
    } catch (error) {
      throw new Error("Error fetching unit: " + error); // Gérer les erreurs
    }
  }


  async deleteUnit(unitId: number, deletedBy: string): Promise<Unit> {
    try {
      const unit = await Unit.findOne({ where: { unitId, isDeleted: false } });
      if (!unit) {
        throw new Error('Unité non trouvée ou déjà supprimée');
      }
      const photos = await PhotoUnit.findAll({ where: { unitId, isDeleted: false } });
      const categoryUnit = await CategoryUnitUnit.findAll( {where: { unitId, isDeleted: false }})
      const SpecificAmenitiesUnit = await AmenitiesUnit.findAll( {where: { unitId, isDeleted: false }})
      const adjustedTime = await new TimeZoneService().getAdjustedTime(unit.facilityId);
      const deleteData = { isDeleted: true, deletedBy, deletedAt: adjustedTime ?? null };

      if (photos.length > 0) {
        await PhotoUnit.update(deleteData, { where: { unitId } });
      }
      if(categoryUnit.length >0){
        await  CategoryUnitUnit.update(deleteData, { where: { unitId } });
      }
      if(SpecificAmenitiesUnit.length >0){
          await AmenitiesUnit.update(deleteData, { where: { unitId } });
      }
     
      unit.isDeleted = true;
      unit.deletedBy = deletedBy;
      unit.deletedAt = adjustedTime ?? new Date();
      return await unit.save();

      
    }
    catch (error) {
      throw new Error("Error delete Unit: " + error);
    }
  }

 

  // check facility in unit  (Repo)

  async checkFacilityInUnit(facilityId: number) {
    try {
      const unit = await Unit.findOne({ where: { facilityId: facilityId, isDeleted: false } });

      if (unit) {
        throw new Error("This facility is assigned to a unit. Please either delete the unit or reassign the facility before proceeding.");
      }

      return unit;
    } catch (error) {
      throw new Error(`Failed to check facility in unit ${error}`); // Propagation de l'erreur
    }
  }

  async getUnitByIdFacility(facilityId: number, unitId: number): Promise<Unit | null> {

    try {
      const existingUnitBYnIDandFacility = await Unit.findOne({
        where: {
          unitId: unitId,
          facilityId: facilityId,
          isDeleted: false,
        },
        include: [
          {
            model: PhotoUnit,
            required: false,
          },
        ],
      });


      return existingUnitBYnIDandFacility;
    } catch (error) {
      throw new Error("Error fetching unit: " + error);
    }

  }

async getSortTypeUnitRepo(facilityId: number): Promise<Unit[]> {
    try {
    

        const units = await Unit.findAll({
            include: [{
                model: TypeUnit,
                as: 'typeUnit',
                required: false 
            }],
            where: {
                isDeleted: false,
                  facilityId: facilityId,
            }
        });

        return units;
    } catch (error) {
        console.error('Error in getSortTypeUnitRepo:', error);
        throw error; // Let the controller handle it
    }
}
}