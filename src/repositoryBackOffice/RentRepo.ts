import { Rent } from "../models/Rent";
import { TimeZoneService } from '../middleware/TimeZone';
import { Agreement } from "../models/Agreement";

interface IRentRepo {
    save(rent: Rent, facilityId: number): Promise<Rent>;
    calculerDueDate(dateStr: Date): Promise<any>;
    update(rent: Rent,facilityId : number): Promise<Rent>;
    // delete(rentId: number, deletedBy: string): Promise<Rent>;
    // retrieveAll(facilityId: number): Promise<Rent[]>;
}

export class RentRepo implements IRentRepo {
    async calculerDueDate(dateStr: Date): Promise<any> {
        let date = new Date(dateStr);
        let dateEcheance;

        if (date) {
            if (date.getDate() > 1) {
                // get month donne 0 pour janvier 
                if (date.getMonth() === 11) {

                    dateEcheance = new Date(date.getFullYear() + 1, 0, 2);
                } else {

                    dateEcheance = new Date(date.getFullYear(), date.getMonth() + 2, 2);
                }

            } else {

                dateEcheance = new Date(date.getFullYear(), date.getMonth() + 1, 2);

            }
        }

        return dateEcheance;
    }

    // save Rent object (Repo)

    /*async save(rent: Rent, facilityId: number): Promise<Rent> {
        try {

            const savedRent = await Rent.create({
                userId: rent.userId,
                unitId: rent.unitId,
                rentMoveIn: rent.rentMoveIn,
                rentMoveOut: rent.rentRecurence == 'daily' ? rent.rentMoveOut : null,
                rentMoveOut: rent.rentMoveOut,
                //rentMoveOut: rent.rentRecurence === 'daily' ? rent.rentMoveOut : null,
                rentDueDate: await this.calculerDueDate(rent.rentMoveIn),
                rentRecurence: rent.rentRecurence,
                rentValue: rent.rentValue,
                rentInsured: 0,
                
            rentIsHold: rent.rentIsHold,
                rentInsuredType: "Fixed Rate",
                createdBy: rent.createdBy,
                isDeleted: false,
                createdAt: await new TimeZoneService().getAdjustedTime(facilityId),
                updatedAt: await new TimeZoneService().getAdjustedTime(facilityId)
            });
            return savedRent;
        } catch (error) {
            throw new Error("Failed to create Rent! " + error);
        }
    }*/
   async save(rent: Rent, facilityId: number): Promise<Rent> {
        try {

            const savedRent = await Rent.create({
                userId: rent.userId,
                unitId: rent.unitId,
                rentMoveIn: rent.rentMoveIn,
                rentMoveOut: rent.rentMoveOut,
                //rentMoveOut: rent.rentRecurence === 'daily' ? rent.rentMoveOut : null,
                rentDueDate: await this.calculerDueDate(rent.rentMoveIn),
                rentRecurence: rent.rentRecurence,
                rentValue: rent.rentValue,
                rentInsured: 0,
                rentAgreement: rent.rentAgreement,
            rentIsHold: rent.rentIsHold,
                rentInsuredType: "Fixed Rate",
                createdBy: rent.createdBy,
                isDeleted: false,
                createdAt: await new TimeZoneService().getAdjustedTime(facilityId),
                updatedAt: await new TimeZoneService().getAdjustedTime(facilityId)
            });
            return savedRent;
        } catch (error) {
            throw new Error("Failed to create Rent! " + error);
        }
    }
      // update Rent object (Repo)

    async update(rent: Rent,facilityId : number): Promise<Rent> {
        try {
            const existingRent = await Rent.findOne({
                where: { rentId: rent.rentId  },
            });

            if (!existingRent) {
                throw new Error("Rent not found!");
            }

            existingRent.rentMoveOut =  rent.rentMoveOut
            existingRent.rentDueDate = rent.rentDueDate 
            existingRent.rentValue = rent.rentValue;
            existingRent.rentInsured = rent.rentInsured; 
            existingRent.rentInsuredType = rent.rentInsuredType;
            existingRent.updatedBy = rent.updatedBy;
            existingRent.updatedAt = await new TimeZoneService().getAdjustedTime(facilityId) ?? new Date();

            // Sauvegarde de la mise à jour
            await existingRent.save();

            return existingRent;
        } catch (error) {
            throw new Error("Failed to update Rent! " + error);
        }
    }

    // // find All By facilityId Rent object (Repo)

    // async retrieveAll(facilityId: number): Promise<Rent[]> {
    //     try {
    //         return await Rent.findAll({
    //             where: {
    //                 isDeleted: false,
    //                 facilityId: facilityId,
    //             },
    //         });
    //     } catch (error) {
    //         throw new Error(`Failed to retrieve all Rent: ${error}`);
    //     }
    // }
    // // delete Rent object (Repo)

    // async delete(rentId: number, deletedBy: string): Promise<Rent> {
    //     try {
    //         const rentToDelete = await Rent.findOne({
    //             where: { rentId: rentId },
    //         });
    //         if (!rentToDelete) {
    //             throw new Error("Rent not found!");
    //         }
    //         rentToDelete.isDeleted = true;
    //         rentToDelete.deletedBy = deletedBy;
    //         const adjustedTime = await new TimeZoneService().getAdjustedTime(rentToDelete.facilityId);
    //         if (adjustedTime !== null) {
    //             rentToDelete.deletedAt = adjustedTime;
    //         }
    //         await rentToDelete.save();
    //         return rentToDelete;
    //     } catch (error) {
    //         throw new Error("Failed to soft delete Rent! " + error);
    //     }
    // }


     async retrieveAll(): Promise<Rent[]> {
         try {
            return await Rent.findAll({
                 where: {
                     isDeleted: false,
                    
                 },
             });
         } catch (error) {
             throw new Error(`Failed to retrieve all Rent: ${error}`);
         }
     } 
     
     async retrieveAllByCompany(companyId: number): Promise<Agreement[]> {
    try {
      const agreements = await Agreement.findAll({
        where: {
          isDeleted: false,
          companyId: companyId
        },
      });
      
      return agreements;
    } catch (error) {
      throw new Error("Failed to find agreements by company ID: " + error);
    }
}


}
