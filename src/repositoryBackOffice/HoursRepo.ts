import { Hours } from "../models/Hours";
import { TimeZoneService } from '../middleware/TimeZone';
interface IHoursRepo {
    save(hours: Hours): Promise<Hours>;
    update(hours: Hours): Promise<Hours>;
    delete(hoursId: number, deleteBy: string): Promise<Hours>;
    //   retrieveById(HoursId: number): Promise<Hours>;
    retrieveAllByFacility(facilityId: number): Promise<Hours[]>;
}
export class HoursRepo implements IHoursRepo {
    //  saved Hours object (Repo)
    async save(hours: Hours): Promise<Hours> {
        try {
            const savedHours = await Hours.create({
                facilityId: hours.facilityId,
                hoursType: hours.hoursType,
                hoursEndTime: hours.hoursEndTime,
                hoursStartTime: hours.hoursStartTime,
                hoursClosing : hours.hoursClosing,
                hoursApponentonly : hours.hoursApponentonly,
                
                hoursDay: hours.hoursDay,
                createdBy: hours.createdBy,
                isDeleted: false,
                createdAt: await new TimeZoneService().getAdjustedTime(hours.facilityId),
                updatedAt: await new TimeZoneService().getAdjustedTime(hours.facilityId)
            });
            return savedHours;
        } catch (error) {
            throw new Error("Failed to create Hours!" + error);
        }
    }
    //  update Hours object (Repo)
    async update(hours: Hours): Promise<Hours> {

        try {
            const new_hours = await Hours.findOne({
                where: {
                    hoursId: hours.hoursId,
                },
            });
            if (!new_hours) {
                throw new Error("Hours not found!");
            }
                new_hours.hoursEndTime = hours.hoursEndTime,
                new_hours.hoursStartTime = hours.hoursStartTime,
                new_hours.hoursApponentonly = hours.hoursApponentonly,
                new_hours.hoursClosing = hours.hoursClosing,
                new_hours.updatedBy = hours.updatedBy,
                new_hours.updatedAt = await new TimeZoneService().getAdjustedTime(new_hours.facilityId) ?? new_hours.updatedAt;
            await new_hours.save();
            return new_hours;
        } catch (error) {
            throw new Error("Failed to update Hours!" + error);
        }
    }
    // retrieveAll Hours object (Repo)
    async retrieveAllByFacility(facilityId: number): Promise<Hours[]> {
        try {
            return await Hours.findAll({
                where: {
                    isDeleted: false,
                    facilityId: facilityId
                },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all Hours: ${error}`);
        }
    }
    // delete Hours object (Repo)
    async delete(hoursId: number, deleteBy: string): Promise<Hours> {
        try {
            const HoursToDelete = await Hours.findOne({
                where: {
                    hoursId: hoursId,
                },
            });
            if (!HoursToDelete) {
                throw new Error("Hours not found!");
            }
            HoursToDelete.isDeleted = true;
            HoursToDelete.deletedBy = deleteBy
            const adjustedTime = await new TimeZoneService().getAdjustedTime(HoursToDelete.facilityId);

            if (adjustedTime !== null) {
                HoursToDelete.deletedAt = adjustedTime;
            }
            await HoursToDelete.save();
            return HoursToDelete;

        } catch (error) {
            throw new Error("Failed to soft delete Hours! " + error);
        }
    }
  
}