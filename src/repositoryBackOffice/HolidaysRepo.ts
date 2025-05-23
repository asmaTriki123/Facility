import { Holidays } from "../models/Holidays";
import { TimeZoneService } from '../middleware/TimeZone';
import { Facility } from './../models/Facility';
import dataBase from "../config/database"
import { Transaction } from "sequelize";
import { HolidaysFacility } from "../models/HolidaysFacility";
interface IHolidaysRepo {
    save(holidays: Holidays): Promise<Holidays>;
    update(holidays: Holidays): Promise<Holidays>;
    //delete(holidaysId: number, deleteBy: string): Promise<Holidays>;
    //   retrieveById(HolidaysId: number): Promise<Holidays>;
    retrieveAll(facilityId: number): Promise<Holidays[]>;
    retrieveAllByAdmin(): Promise<Holidays[]>;
 deleteHolidayIfPossible(holidaysId: number, deletedBy: string): Promise<{
    success: boolean,
    message?: string,
    holiday?: any,
    updatedFacilities?: number
}>

}
export class HolidaysRepo implements IHolidaysRepo {
    //  saved Holidays object (Repo)
    async save(holidays: Holidays): Promise<Holidays> {
        // const seq=dataBase?.getInstance()?.sequelize 
        // if (!seq) {
        //     throw new Error('La connexion à la base de données n\'est pas disponible.');
        // }        const transaction: Transaction = await seq.transaction();
        try {
            console.log('Holidays', holidays)
            const savedHolidays = await Holidays.create({
                holidaysName: holidays.holidaysName,
                holidaysCountry: holidays.holidaysCountry,
                createdBy: holidays.createdBy,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const facilities = await Facility.findAll({
                where: { country: holidays.holidaysCountry },
            });
            if (facilities) {
                const holidaysFacilityPromises = facilities.map(async facility => {
                    return HolidaysFacility.create({
                        facilityId: facility.facilityId,
                        holidaysId: savedHolidays.holidaysId,
                        createdBy: holidays.createdBy,
                        holidaysIsOptionAvailable: false,
                        isDeleted: false,
                        createdAt: await new TimeZoneService().getAdjustedTime(facility.facilityId),
                    });
                });
                await Promise.all(holidaysFacilityPromises);
            }

            return savedHolidays;
        } catch (error) {
           // await transaction.rollback();

            throw new Error("Failed to create Holidays!" + error);
        }
    }
    //  update Holidays object (Repo)
    async update(holidays: Holidays): Promise<Holidays> {

        try {
            const new_holidays = await Holidays.findOne({
                where: {
                    holidaysId: holidays.holidaysId,
                },
            });
            if (!new_holidays) {
                throw new Error("holidays not found!");
            }
                const previousCountry = new_holidays.holidaysCountry;
                new_holidays.holidaysName = holidays.holidaysName,
                new_holidays.holidaysCountry = holidays.holidaysCountry,
                new_holidays.updatedBy = holidays.updatedBy,
                // new_holidays.updatedAt = await new TimeZoneService().getAdjustedTime(new_holidays.facilityId) ?? new_holidays.updatedAt;
                new_holidays.updatedAt = new Date();
             
                
            await new_holidays.save();
            return new_holidays;
        } catch (error) {
            throw new Error("Failed to update Holidays!" + error);
        }
    }
    // retrieveAll By facilityId Holidays object (Repo)
    async retrieveAll(facilityId: number): Promise<Holidays[]> {
        try {
            return await Holidays.findAll({
                where: {
                    isDeleted: false,
                    facilityId: facilityId
                },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all Holidays: ${error}`);
        }
    }
    async retrieveAllByAdmin(): Promise<Holidays[]> {
        try {
            return await Holidays.findAll({
                where: {
                    isDeleted: false,

                },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all Holidays: ${error}`);
        }
    }




  async deleteHolidayIfPossible(holidaysId: number, deletedBy: string): Promise<{
    success: boolean,
    message?: string,
    holiday?: any,
    updatedFacilities?: number
}> {
    // Vérifie si la holiday est associée à une facility active
    const activeCount = await HolidaysFacility.count({
        where: {
            holidaysId,
            isDeleted: false,
            holidaysIsOptionAvailable: true,
        },
    });

    if (activeCount > 0) {
        return {
            success: false,
            message: "Cannot delete this Holiday. Please delete the associated facilities first. ",
        };
    }

    // Suppression réelle si aucune association bloquante
    const { holiday, updatedFacilities } = await this.deleteHolidayWithDependencies(holidaysId, deletedBy);

    return {
        success: true,
        holiday,
        updatedFacilities
    };
}



    // Vérifie si le holiday peut être supprimé

  

    async deleteHolidayWithDependencies(holidaysId: number, deletedBy: string): Promise<{
        holiday: Holidays,
        updatedFacilities: number
    }> {
        // 1. Soft delete du holiday
        const holiday = await Holidays.findOne({ where: { holidaysId } });
        if (!holiday) throw new Error("Holiday introuvable");

        holiday.isDeleted = true;
        holiday.deletedBy = deletedBy;
        holiday.deletedAt = new Date();
        await holiday.save();

        // 2. Soft delete des associations dans HolidaysFacility
        const [updatedCount] = await HolidaysFacility.update({
            isDeleted: true,
            deletedBy: deletedBy,
            deletedAt: new Date()
        }, {
            where: {
                holidaysId,
                isDeleted: false // On ne met à jour que les non-supprimés
            }
        });

        return {
            holiday,
            updatedFacilities: updatedCount
        };
    }


    // Supprime (soft delete) le holiday
    async deleteHoliday(holidaysId: number, deletedBy: string): Promise<Holidays> {
        const holiday = await Holidays.findOne({ where: { holidaysId } });
        if (!holiday) throw new Error("Holiday not found");

        holiday.isDeleted = true;
        holiday.deletedBy = deletedBy;
        holiday.deletedAt = new Date();
        
        await holiday.save();
        return holiday;
    }


  
  

    async getAllholidaysByCountryAvailaible(Country: string): Promise<Holidays[]> {
        try {
            const holidaysCountry = await Holidays.findAll({
                where: {
                    holidaysCountry: Country,
                    isDeleted: false,
                },
                include: [
                    {
                        model: HolidaysFacility,
                    }
                ]
            });
            return holidaysCountry

        } catch (error) {
            throw new Error("Error fetching Holidays: " + error);
        }
    }

}