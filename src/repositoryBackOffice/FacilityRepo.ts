import { TimeZoneService } from "../middleware/TimeZone";
import { AmenitiesFacility } from "../models/AmenitiesFacility";
import { Company } from "../models/Company";
import { Coordinate } from "../models/Coordinate";
import { Facility } from "../models/Facility";
import { FacilityManagement } from "../models/FacilityManagement";
import { HolidaysFacility } from "../models/HolidaysFacility";
import { Hours } from "../models/Hours";
import { PhotosFacility } from "../models/PhotosFacility";
import { User } from "../models/User";
import { Op } from "sequelize";

interface IFacilityRepo {
  save(facility: Facility): Promise<Facility>;
  update(facility: Facility): Promise<Facility>;
  deleteFacilityAndAssociations(facilityId: number, deletedBy: string): Promise<Facility>
  retrieveAll(): Promise<Facility[]>;
  getFacilitiesByCompanyId(companyId: number): Promise<Facility[]>
}

export class FacilityRepo implements IFacilityRepo {
  // save Facility object (Repo)

  async save(facility: Facility): Promise<Facility> {
    try {

      const savedFacility = await Facility.create({
        createdAt: new Date(),
        facilityAddress: facility.facilityAddress,
        facilityCellPhoneNumber: facility.facilityCellPhoneNumber,
        facilityDescription: facility.facilityDescription,
        facilityName: facility.facilityName,
        facilityPhoneNumber: facility.facilityPhoneNumber,

        facilityAdminFee: facility.facilityAdminFee,
        createdBy: facility.createdBy,

        facilityUrl: facility.facilityUrl,
        country: facility.country,
        facilityType: facility.facilityType,
        facilityTimezone: facility.facilityTimezone,
        facilityGoogleMapslink: facility.facilityGoogleMapslink,
        facilityLatitude: facility.facilityLatitude,
        facilityLongitude: facility.facilityLongitude,
        facilityAdditionalNote: facility.facilityAdditionalNote,
        isDeleted: false,
      });

      return savedFacility;
    } catch (error) {
      throw new Error("Failed to create Facility! " + error);
    }
  }
  // update Facility object (Repo)
  async update(facility: Facility): Promise<Facility> {

    try {
      const new_facility = await Facility.findOne({
        where: {
          facilityId: facility.facilityId,
        },
      });
      if (!new_facility) {
        throw new Error("Facility not found!");
      }
      new_facility.facilityAddress = facility.facilityAddress,
        new_facility.facilityCellPhoneNumber = facility.facilityCellPhoneNumber,
        new_facility.facilityPhoneNumber = facility.facilityPhoneNumber,
        new_facility.facilityName = facility.facilityName;

      new_facility.facilityTimezone = facility.facilityTimezone;

      new_facility.facilityType = facility.facilityType;
      new_facility.facilityAdminFee = facility.facilityAdminFee;
      new_facility.facilityDescription = facility.facilityDescription;
      new_facility.facilityUrl = facility.facilityUrl;
      new_facility.facilityAdditionalNote = facility.facilityAdditionalNote;
      new_facility.facilityLatitude = facility.facilityLatitude;
      new_facility.facilityGoogleMapslink = facility.facilityGoogleMapslink;
      new_facility.facilityLongitude = facility.facilityLongitude;
      new_facility.country = facility.country;
      new_facility.updatedAt = await new TimeZoneService().getAdjustedTime(facility.facilityId) ?? facility.updatedAt;
      new_facility.updatedBy = facility.updatedBy;

      await new_facility.save();
      return new_facility;
    } catch (error) {
      throw new Error("Failed to update Coordinate!" + error);
    }
  }

  async retrieveAll(): Promise<Facility[]> {
    try {

      return await Facility.findAll({
        where: {
          isDeleted: false,
        },
      });


    } catch (error) {
      throw new Error("Error fetching unit: " + error);
    }
  }
  async findOneFacilityWithUsersCompanyAndPhotos(facilityId: number): Promise<Facility | null> {
    try {
      return await Facility.findOne({
        where: {
          isDeleted: false,
          facilityId: facilityId
        },
        include: [
          {
            model: FacilityManagement,
            where: {
              isDeleted: false,
            },
            include: [
              {
                model: User,
                required: true,
                where: {
                  isDeleted: false,
                  userType: {
                    [Op.notIn]: ["admin", "customer"] // Récupère les users dont userType n'est PAS Admin ou customer
                  }
                },
                include: [
                  {
                    model: Company,
                    required: true,
                    where: {
                      isDeleted: false,
                    },

                  },
                ],
              },
            ],
          },
          {
            model: PhotosFacility,
            where: { isDeleted: false }, // si tu veux exclure les photos supprimées
            required: false, // permet de renvoyer la facility même s’il n’y a pas de photo
          },
        ],
      });
    } catch (error) {
      throw new Error("Erreur lors de la récupération de la facility avec les détails : " + error);
    }
  }

  async retrieveAllByUser(userId: string): Promise<Facility[]> {
    try {
      return await Facility.findAll({
        where: {
          isDeleted: false,
        },
        include: [
          {
            model: FacilityManagement,
            where: { userId: userId, isDeleted: false }, 
          },
        ],
      });
    } catch (error) {
      throw new Error("Error fetching facilities: " + error);
    }
  }

  async getFacility(facilityId: number): Promise<Facility | null> {
    try {

      const existingFacility = await Facility.findOne({
        where: {
          facilityId: facilityId,
          isDeleted: false
        },
      });

      if (!existingFacility) {
        throw new Error("facility not found!");
      }
      return existingFacility;
    } catch (error) {
      throw new Error("Error fetching unit: " + error);
    }
  }

  // delete Facility object (Repo)
  async deleteFacilityAndAssociations(facilityId: number, deletedBy: string): Promise<Facility> {
    try {
      const facility = await Facility.findOne({ where: { facilityId, isDeleted: false } });
      if (!facility) {
        throw new Error("Facility not found or already deleted");
      }

      const adjustedTime = await new TimeZoneService().getAdjustedTime(facility.facilityId);
      const deleteData = { isDeleted: true, deletedBy, deletedAt: adjustedTime ?? new Date() };
      const whereCondition = { facilityId };

      facility.isDeleted = true;
      facility.deletedBy = deletedBy;
      facility.deletedAt = adjustedTime ?? new Date();

      await Promise.all([
        AmenitiesFacility.update(deleteData, { where: whereCondition }),
        Coordinate.update(deleteData, { where: whereCondition }),
        HolidaysFacility.update(deleteData, { where: whereCondition }),
        Hours.update(deleteData, { where: whereCondition }),
        PhotosFacility.update(deleteData, { where: whereCondition })
      ]);

      return await facility.save();
    }
    catch (error) {
      throw new Error("Error delete facility: " + error);
    }
  };




  async getFacilitiesByCompanyId(companyId: number): Promise<Facility[]> {
    try {

      const users = await User.findAll({
        where: { companyId },
      });

      // Récupérer les facilityIds associés à ces utilisateurs via FacilityManagement
      const facilityIds = await FacilityManagement.findAll({
        where: { userId: users.map((user) => user.userId) },
        attributes: ["facilityId"],
      });

      // Récupérer les facilities correspondants
      const facilities = await Facility.findAll({
        where: { facilityId: facilityIds.map((fm) => fm.facilityId) },
      });

      return facilities;
    } catch (error) {
      throw new Error(`Failed to fetch facilities: ${error}`);
    }
  }
}