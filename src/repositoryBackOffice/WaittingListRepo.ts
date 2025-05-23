import { Op } from "sequelize";
import { UniqueIdUser } from "../middleware/UniqueIdUser";
import { Permission } from "../models/Permission";
import { WaittingList } from "../models/WaittingList";
import Authentication from "../utils/Authentication";
interface IUserRepo {
    save(waittingList: WaittingList): Promise<WaittingList>;
    getAllWattingListByfacility(facilityId: number): Promise<WaittingList[]>
   deleteOneWaittingList(waittingListId: number, deletedBy: string): Promise<WaittingList> 
}

export class WaittingListRepo implements IUserRepo {
    async save(waittingList: WaittingList): Promise<WaittingList> {
    console.log("user", waittingList);
    try {
      const WaittingListId = await new UniqueIdUser().generateUniqueId2();
      console.log('userPassword', waittingList.userPassword);
      const hashedPassword: string = await Authentication.passwordHash(waittingList.userPassword)
      const userPhoto = waittingList.userPhoto || 'user2.PNG';
      const userDriverUrl = waittingList.userDriverUrl || 'driverlicence.PNG';

      const new_WaittingList = await WaittingList.create({

        WaittingListId: WaittingListId,
        userFirstName: waittingList.userFirstName,
        userLastName: waittingList.userLastName,

        userEmail: waittingList.userEmail,
        userPassword: hashedPassword,
        userCellPhone: waittingList.userCellPhone,
        userType: waittingList.userType,
        userEmailInfo: waittingList.userEmailInfo,
        userAdress1: waittingList.userAdress1,
        userAdress2: waittingList.userAdress2,
        userPhoneNumber: waittingList.userPhoneNumber,
        userPostalCode: waittingList.userPostalCode,
        userDriverLicense: waittingList.userDriverLicense,
        //userDriverUrl: user.userDriverUrl,
        userDriverUrl: userDriverUrl,
        userIsActive: false,
        userSmsOptIn: waittingList.userSmsOptIn,
        userNewsletterOptIn: waittingList.userNewsletterOptIn,
        userIsVerified: false,
        //userPhoto: user.userPhoto,
        userPhoto: userPhoto,
        userNotes: waittingList.userNotes,
        userCountry: waittingList.userCountry,
        userGender: waittingList.userGender,
        userCity: waittingList.userCity,
        LastLogin: waittingList.LastLogin,
        createdBy: waittingList.createdBy,
        userState: waittingList.userState,
        rentMoveIn : waittingList.rentMoveIn,
         typeUnitId : waittingList.typeUnitId,
        facilityId: waittingList.facilityId,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
   

      }, { returning: true });

      return new_WaittingList;
    } catch (error) {
      throw new Error("Failed to create user! " + error);
    }
  }



async getAllWattingListByfacility(facilityId: number): Promise<WaittingList[]> {
      try {
  
        const WattingList = await WaittingList.findAll({
          where: {
            facilityId: facilityId,
            isDeleted : false,
          },
        });
        return WattingList;
      } catch (error) {
        throw new Error("Error fetching WattingList: " + error);
      }
 }

 async deleteOneWaittingList(waittingListId: number, deletedBy: string): Promise<WaittingList> {
    const waittingList = await WaittingList.findOne({ where: { waittingListId, isDeleted: false } });

    if (!waittingList) {
      throw new Error('Liste d\'attente introuvable ou déjà supprimée');
    }

    waittingList.isDeleted = true;
    waittingList.deletedBy = deletedBy;
    waittingList.deletedAt = new Date();

    await waittingList.save();
    return waittingList;
  }
 
}
