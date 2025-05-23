import { TimeZoneService } from "../middleware/TimeZone";
import { Holidays } from "../models/Holidays";
import { HolidaysFacility } from "../models/HolidaysFacility";
interface IHolidaysFacility {
    save(HolidaysFacility: HolidaysFacility): Promise<HolidaysFacility>;
}

export class HolidaysFacilityRepo implements IHolidaysFacility {

    async save(holidaysFacility: HolidaysFacility): Promise<HolidaysFacility> {
        try {
            const savedHolidaysFacility = await HolidaysFacility.create({

                facilityId: holidaysFacility.facilityId,
                holidaysId: holidaysFacility.holidaysId,
                holidaysIsOptionAvailable: holidaysFacility.holidaysIsOptionAvailable,
                createdBy: holidaysFacility.createdBy,
                isDeleted: false,
                createdAt: await new TimeZoneService().getAdjustedTime(holidaysFacility.facilityId),

            });
            return savedHolidaysFacility;
        } catch (error) {
            throw new Error("Failed to create HolidaysFacility! " + error);
        }
    }
    // check Holidays in HolidaysFacility  (Repo)

    async checkHolidaysInHolidaysFacility(holidaysId: number) {
        try {
            const holidays = await HolidaysFacility.findOne({ where: { holidaysId: holidaysId, isDeleted: false } });

            if (holidays) {
                throw new Error("This holidyays is assigned to a holidaysFacility. Please either delete the holidaysFacility ");
            }

            return holidays;
        } catch (error) {
            throw new Error(`Failed to check holidays in holidays facility ${error}`); // Propagation de l'erreur
        }
    }




    async getAllholidaysCountryByCountry(holidaysCountry: string): Promise<Holidays[]> {
        try {
            const holidaysCountryHoliday = await Holidays.findAll({
                where: {
                    holidaysCountry: holidaysCountry, // Recherche par nom de pays (chaîne)
                    isDeleted: false,
                },
            });
            return holidaysCountryHoliday;
        } catch (error) {
            throw new Error("Error fetching Holidays: " + error);
        }
    }
    async update(holidaysFacility: HolidaysFacility): Promise<HolidaysFacility> {
        try {
            const existingholidays = await HolidaysFacility.findOne({
                where: { holidaysfacilityId: holidaysFacility.holidaysfacilityId },
            });
            if (!existingholidays) {
                throw new Error("holidays facility not found!");
            }
            existingholidays.holidaysIsOptionAvailable = holidaysFacility.holidaysIsOptionAvailable;
            existingholidays.updatedBy = holidaysFacility.updatedBy;
            existingholidays.updatedAt = await new TimeZoneService().getAdjustedTime(existingholidays.facilityId) ?? existingholidays.updatedAt;
            await existingholidays.save();
            return existingholidays;
        } catch (error) {
            throw new Error("Failed to update holidays Facility! " + error);
        }
    }


}