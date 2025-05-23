import { AccessHours } from "../models/AccessHours";

interface IAccessHoursRepo {
    update(accessHours: AccessHours): Promise<AccessHours>;
    save(accessHours: AccessHours): Promise<AccessHours> 

}
export class AccessHoursRepo implements IAccessHoursRepo {


async update(accessHours: AccessHours): Promise<AccessHours> {
    try {
        const existingHours = await AccessHours.findOne({
            where: {
                AccessHoursId: accessHours.AccessHoursId, // Corrigé ici
            },
        });
        
        if (!existingHours) {
            throw new Error("Hours not found!");
        }

        // Mise à jour des champs
        existingHours.AccessHoursClosing = accessHours.AccessHoursClosing;
        existingHours.AccessHoursDay = accessHours.AccessHoursDay;
        existingHours.AccessHoursType = accessHours.AccessHoursType;
        existingHours.AccessHoursEndTime = accessHours.AccessHoursEndTime;
        existingHours.AccessHoursApponentonly = accessHours.AccessHoursApponentonly;
        existingHours.AccessHoursStartTime = accessHours.AccessHoursStartTime;
        existingHours.updatedBy = accessHours.updatedBy;
        existingHours.updatedAt = new Date(); // Ajout de la date actuelle

        await existingHours.save();
        return existingHours;
    } catch (error) {
        throw new Error("Failed to update Hours Access! " + error);
    }
}

        async retrieveAllByFacility(facilityId: number): Promise<AccessHours[]> {
             try {
                 return await AccessHours.findAll({
                     where: {
                         isDeleted: false,
                         facilityId: facilityId
                     },
                 });
             } catch (error) {
                 throw new Error(`Failed to retrieve all Access Hours: ${error}`);
             }
         }


          async save(accessHours: AccessHours): Promise<AccessHours> {
                 try {
                     const savedAcessHours = await AccessHours.create({
                         facilityId: accessHours.facilityId,
                         AccessHoursApponentonly: accessHours.AccessHoursApponentonly,
                         AccessHoursClosing: accessHours.AccessHoursClosing,
                         AccessHoursEndTime: accessHours.AccessHoursEndTime,
                         AccessHoursStartTime : accessHours.AccessHoursStartTime,
                         AccessHoursDay : accessHours.AccessHoursDay,
                
                         createdBy: accessHours.createdBy,
                         isDeleted: false,
                         createdAt:  new Date(),
                        
                     });
                     return savedAcessHours;
                 } catch (error) {
                     throw new Error("Failed to create Hours Acess!" + error);
                 }
             }
}