import { TimeZoneService } from "../middleware/TimeZone";
import { Amenities } from "../models/Amenities";
import { AmenitiesFacility } from "../models/AmenitiesFacility";
import { Facility } from './../models/Facility';
import dataBase from "../config/database"
import { Transaction } from "sequelize";
interface IAmenitiesRepo {
    save(amenities: Amenities): Promise<Amenities>;
    update(amenities: Amenities): Promise<Amenities>;
    delete(amenitiesId: number, deletedBy: string): Promise<Amenities>;
    retrieveAll(facilityId: number): Promise<Amenities[]>;
    retrieveAllByAdmin(): Promise<Amenities[]>;
    getAllAmenitiesBySection(): Promise<{ sectionName: string; amenities: Amenities[] }[]>;
}

// ✅ Fermeture correcte de l'interface ici ↑

export class AmenitiesRepo implements IAmenitiesRepo {
    async save(amenities: Amenities): Promise<Amenities > {
      
        const seq=dataBase?.getInstance()?.sequelize 
        if (!seq) {
            throw new Error('La connexion à la base de données n\'est pas disponible.');
        }
        const transaction: Transaction = await seq.transaction();
        try {
            // Démarrer la transaction
            const savedAmenities = await Amenities.create({
                amenitiesSection: amenities.amenitiesSection,
                amenitiesOptionName: amenities.amenitiesOptionName,
                createdBy: amenities.createdBy,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
                { transaction });
            const facilities = await Facility.findAll();
            console.log(`Nombre de facilities trouvées : ${facilities?.length}`);
            if (facilities) {
                const facilityAmenitiesPromises = facilities.map(async facility => {
                    return AmenitiesFacility.create(
                        {
                            facilityId: facility.facilityId,
                            amenitiesId: savedAmenities.amenitiesId,
                            createdBy: amenities.createdBy,
                            amenitiesIsOptionAvailable: false,
                            isDeleted: false,
                            createdAt: await new TimeZoneService().getAdjustedTime(facility.facilityId) ?? new Date(),
                            updatedAt: new Date(),
                        },
                        { transaction } // Utilisation de la transaction ici
                    );
                });

                // Exécuter toutes les insertions en parallèle avec `Promise.all()`
                await Promise.all(facilityAmenitiesPromises);

                // Si tout se passe bien, on valide la transaction
                await transaction.commit();
            }
            // Si tout se passe bien, on valide la transaction
            return savedAmenities;
        }
         catch (error) {
            await transaction.rollback();

            throw new Error("Failed to create Amenities! " + error);
        }
    }

    async update(amenities: Amenities): Promise<Amenities> {
        try {
            const existingAmenities = await Amenities.findOne({
                where: { amenitiesId: amenities.amenitiesId },
            });
            if (!existingAmenities) {
                throw new Error("Amenities not found!");
            }
            existingAmenities.amenitiesSection = amenities.amenitiesSection;
            existingAmenities.amenitiesOptionName = amenities.amenitiesOptionName;
            existingAmenities.updatedBy = amenities.updatedBy;
            existingAmenities.updatedAt = new Date();

            await existingAmenities.save();
            return existingAmenities;
        } catch (error) {
            throw new Error("Failed to update Amenities! " + error);
        }
    }

    async retrieveAll(facilityId: number): Promise<Amenities[]> {
        try {
            return await Amenities.findAll({
                where: { isDeleted: false, facilityId: facilityId },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all Amenities: ${error}`);
        }
    }

    async retrieveAllByAdmin(): Promise<Amenities[]> {
        try {
            return await Amenities.findAll({
                where: { isDeleted: false },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all Amenities: ${error}`);
        }
    }

    async delete(amenitiesId: number, deletedBy: string): Promise<Amenities> {
        try {
            const amenitiesToDelete = await Amenities.findOne({
                where: { amenitiesId: amenitiesId },
            });
            if (!amenitiesToDelete) {
                throw new Error("Amenities not found!");
            }
            amenitiesToDelete.isDeleted = true;
            amenitiesToDelete.deletedBy = deletedBy;
            amenitiesToDelete.deletedAt = new Date();

            await amenitiesToDelete.save();
            return amenitiesToDelete;
        } catch (error) {
            throw new Error("Failed to soft delete Amenities! " + error);
        }
    }

    async getAllAmenitiesBySection(): Promise<{ sectionName: string; amenities: Amenities[] }[]> {
        try {
            const allAmenities = await Amenities.findAll({ where: { isDeleted: false } });

            const groupedAmenities = allAmenities.reduce((acc, amenity) => {
                const sectionName = amenity.amenitiesSection || "Autres"; // Gestion des valeurs nulles
                if (!acc[sectionName]) acc[sectionName] = [];
                acc[sectionName].push(amenity);
                return acc;
            }, {} as { [key: string]: Amenities[] });

            return Object.keys(groupedAmenities).map((sectionName) => ({
                sectionName,
                amenities: groupedAmenities[sectionName],
            }));
        } catch (error) {
            throw new Error(`Failed to retrieve all Amenities: ${error}`);
        }
    }
    async getAmenitiesByFacility(facilityId: number): Promise<{ sectionName: string; amenities: any[] }[]> {
        try {
            // Récupérer toutes les amenities avec les données de l'option de disponibilité (true/false)
            const allAmenities = await Amenities.findAll({
                where: { isDeleted: false }, // Filtrer les éléments non supprimés
                include: [{
                    model: AmenitiesFacility, // Inclure les informations liées à AmenitiesFacility
                    where: { isDeleted: false, facilityId: facilityId },
                    required: false, // Permet de récupérer même si il n'y a pas de facility liée
                }]
            });

            // Regrouper les amenities par section
            const groupedAmenities = allAmenities.reduce((acc, amenity) => {
                const sectionName = amenity.amenitiesSection || "Autres"; // Utiliser "Autres" si section est nulle
                if (!acc[sectionName]) acc[sectionName] = [];

                // Inclure l'état de l'option (true/false) dans les résultats
                acc[sectionName].push({
                    amenitiesfacility: amenity.amenitiesfacility, // Lier la facility ici
                    // amenitiesSection: amenity.amenitiesSection,
                    amenitiesOptionName: amenity.amenitiesOptionName,

                });

                return acc;
            }, {} as { [key: string]: any[] });

            // Retourner les résultats groupés
            return Object.keys(groupedAmenities).map((sectionName) => ({
                sectionName,
                amenities: groupedAmenities[sectionName],
            }));
        } catch (error) {
            throw new Error(`Failed to retrieve all Amenities: ${error}`);
        }
    }




}
