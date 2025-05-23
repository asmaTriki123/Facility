import { FacilityManagement } from "../models/FacilityManagement";
import { TimeZoneService } from '../middleware/TimeZone';

interface IFacilityManagementRepo {
    save(facilityManagement: FacilityManagement): Promise<FacilityManagement>;
   // update(facilityManagement: any[]): Promise<void>;
    delete(facilityManagementId: number, deletedBy: string): Promise<FacilityManagement>;
    //retrieveAll(facilityId: number): Promise<FacilityManagement[]>;
}

export class FacilityManagementRepo implements IFacilityManagementRepo {
    // save FacilityManagement object (Repo)

    async save(facilityManagement: FacilityManagement): Promise<FacilityManagement> {
        try {
            const savedFacilityManagement = await FacilityManagement.create({
                facilityId: facilityManagement.facilityId,
                userId: facilityManagement.userId,
                isInActive: facilityManagement.isInActive,
                createdBy: facilityManagement.createdBy,
                isDeleted: false,
                createdAt: await new TimeZoneService().getAdjustedTime(facilityManagement.facilityId),
                updatedAt: await new TimeZoneService().getAdjustedTime(facilityManagement.facilityId)
            });
            return savedFacilityManagement;
        } catch (error) {
            throw new Error("Failed to create FacilityManagement! " + error);
        }
    }
    // update FacilityManagement object (Repo)

    // async update(facilityManagement: any[]): Promise<void> {
    //     try {
    //         await FacilityManagement.destroy({
    //             where: { facilityId: facilityManagement[0].facilityId },
    //         });
    //         for (const item of facilityManagement) {
    //             console.log('itemmm facility ', item.agentId)
    //             await FacilityManagement.create({
    //                 facilityId: item.facilityId,
    //                 agentId: item.agentId,
    //                 customerId: item.customerId,
    //                 updateBy: item.updatedBy,
    //                 updatedAt: await new TimeZoneService().getAdjustedTime(item.facilityId)
    //             });

    //         }

    //     } catch (error) {
    //         throw new Error("Failed to update FacilityManagement! " + error);
    //     }
    // }
    // // find All By facilityId FacilityManagement object (Repo)

    // async retrieveAll(facilityId: number): Promise<FacilityManagement[]> {
    //     try {
    //         return await FacilityManagement.findAll({
    //             where: {
    //                 isDeleted: false,
    //                 facilityId: facilityId,
    //             },
    //         });
    //     } catch (error) {
    //         throw new Error(`Failed to retrieve all FacilityManagement: ${error}`);
    //     }
    // }
    // delete FacilityManagement object (Repo)

    async delete(facilityManagementId: number, deletedBy: string): Promise<FacilityManagement> {
        try {
            const facilityManagementToDelete = await FacilityManagement.findOne({
                where: { facilityManagementId: facilityManagementId },
            });
            if (!facilityManagementToDelete) {
                throw new Error("FacilityManagement not found!");
            }
            facilityManagementToDelete.isDeleted = true;
            facilityManagementToDelete.deletedBy = deletedBy;
            const adjustedTime = await new TimeZoneService().getAdjustedTime(facilityManagementToDelete.facilityId);
            if (adjustedTime !== null) {
                facilityManagementToDelete.deletedAt = adjustedTime;
            }
            await facilityManagementToDelete.save();
            return facilityManagementToDelete;
        } catch (error) {
            throw new Error("Failed to soft delete FacilityManagement! " + error);
        }
    }
}
