import { Facility } from "../models/Facility";
import { Request, Response } from "express";
import { FacilityRepo } from "../repositoryBackOffice/FacilityRepo";
import { UnitRepository } from "../repositoryBackOffice/UnitRepo";
import { User } from "../models/User";
import { FacilityManagement } from "../models/FacilityManagement";
import { AmenitiesFacility } from "../models/AmenitiesFacility";
import { Coordinate } from "../models/Coordinate";
import { Hours } from "../models/Hours";
import { HolidaysFacility } from "../models/HolidaysFacility";
import { PhotosFacility } from "../models/PhotosFacility";

class FacilityController {

  async create(req: Request, res: Response) {
    try {

      const savedFacility = await new FacilityRepo().save(req.body);
      res.status(201).json({
        status: "Created!",
        message: "Successfully created Facility!",
        data: savedFacility,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error! " + err,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {

      const new_facility = new Facility();
      new_facility.facilityId = parseInt(req.params["facilityId"]);
      new_facility.facilityCellPhoneNumber = req.body.facilityCellPhoneNumber;
      new_facility.facilityAddress = req.body.facilityAddress;
   
      new_facility.facilityDescription = req.body.facilityDescription;
    
      new_facility.facilityAdditionalNote = req.body.facilityAdditionalNote;
      new_facility.facilityLatitude = req.body.facilityLatitude;
      new_facility.facilityLongitude = req.body.facilityLongitude;
      new_facility.facilityGoogleMapslink = req.body.facilityGoogleMapslink;
      new_facility.facilityName = req.body.facilityName;
      new_facility.country = req.body.country;
      new_facility.updatedBy = req.body.updatedBy;
      new_facility.updatedAt = new Date();
      new_facility.facilityUrl = req.body.facilityUrl;
      new_facility.facilityTimezone = req.body.facilityTimezone;
      new_facility.facilityType = req.body.facilityType;
      new_facility.facilityPhoneNumber = req.body.facilityPhoneNumber;
      new_facility.facilityAdminFee = req.body.facilityAdminFee;


      const new_updateFacility = await new FacilityRepo().update(new_facility);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully updated Coordinate data!",
        data: new_updateFacility
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const new_facility = await new FacilityRepo().retrieveAll();
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully fetched all facility data!",
        data: new_facility,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!"+err,
      });
    }
  }
  async findOneForAdmin(req: Request, res: Response) {
    try {
     const new_facility = await new FacilityRepo().findOneFacilityWithUsersCompanyAndPhotos(parseInt(req.params["facilityId"]));
     const facility = {
      facilityId: new_facility?.facilityId,
      facilityName: new_facility?.facilityName,
      facilityUrl: new_facility?.facilityUrl,
      facilityPhoneNumber: new_facility?.facilityPhoneNumber,
      facilityCellPhoneNumber: new_facility?.facilityCellPhoneNumber,
      facilityAddress: new_facility?.facilityAddress,
      facilityDescription: new_facility?.facilityDescription,
      country: new_facility?.country,
      facilityTimezone: new_facility?.facilityTimezone,
      facilityType: new_facility?.facilityType,
      facilityAdminFee: new_facility?.facilityAdminFee,
    };
  
    const managers: any[] = [];
    const agents: any[] = [];
    let company: any | null = null;
  
    new_facility?.facilityManagement.forEach((management: any) => {
      const user = management.users;
      if (!user || user.isDeleted) return;
  
      if (user.userType.toLowerCase() == "manager") {
        managers.push(user);
      } else  {
        agents.push(user);
      }
  
      // tu peux prendre la première company dispo
      if ( user.company) {
        console.log("company",user.company)
        company = {
          companyId: user.company.companyId,
          companyName: user.company.companyName,
          companyEIN: user.company.companyEIN,
          companyAddress: user.company.companyAddress,
          companyCountry: user.company.companyCountry,
          companyCity: user.company.companyCity,
          companyState: user.company.companyState,
          companyPostalCode: user.company.companyPostalCode,
        };
      }
    });
  
    const photos = (new_facility?.photosFacility || []).map((photo: any) => ({
      photosfacilityId: photo.photosfacilityId,
      photosfacilityName: photo.photosfacilityName,
      photosfacilityType: photo.photosfacilityType,
    }));
  
    
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully fetched  facility data for admin !",
        facility,
        managers,
        agents,
        photos,
        company,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!"+err,
      });
    }
  }
  async findAllByUser(req: Request, res: Response) {
    try {
      const new_facility = await new FacilityRepo().retrieveAllByUser(req.params["userId"]);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully fetched all facility data!",
        data: new_facility,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!"+err,
      });
    }
  }
  async findOne(req: Request, res: Response) {
    try {
      const existingUnit = await new FacilityRepo().getFacility(parseInt(req.params["facilityId"]));
      res.status(200).json({
        status: "Success",
        data: existingUnit,
      });
    } catch (error) {
      console.error("Error retrieving facility:", error);
      res.status(500).json({
        status: "Internal Server Error",
        message: "An error occurred while fetching the facility",
      });
    }
  }



  async delete(req: Request, res: Response) {
    try {
       await new UnitRepository().checkFacilityInUnit(parseInt(req.params["facilityId"]));

      // Supprimer logiquement la facility et ses entités associées
      const facilitydeleted = await new FacilityRepo().deleteFacilityAndAssociations(parseInt(req.params["facilityId"]), req.body.deletedBy);
      res.status(200).json({
        message: "Facility and related data have been successfully deleted.",
        data: facilitydeleted
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during the deletion process." });
    }
  };
  async deleteWithReference(req: Request, res: Response) {
    try {
  
        await Promise.all([
          Facility.destroy({ where:  req.body.facilityId  }),
          AmenitiesFacility.destroy({ where:  req.body.facilityId  }),
          Coordinate.destroy({ where:  req.body.facilityId  }),
          HolidaysFacility.destroy({ where:  req.body.facilityId  }),
          Hours.destroy({ where:  req.body.facilityId  }),
          PhotosFacility.destroy({ where:  req.body.facilityId  })
        ]);
   

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during the deletion process." });
    };
  };
  


  // This is the corrected version of getFacilitiesByCompanyId.
   async getFacilitiesByCompanyId(req: Request, res: Response): Promise<void> {
    const { companyId } = req.params;

    if (!companyId) {
       res.status(400).json({ message: "Company ID is required" });
    }

    try {
      const facilities = await new FacilityRepo().getFacilitiesByCompanyId(Number(companyId));
      res.status(200).json({ status: "OK", data: facilities });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error });
    }
  }





}

export default new FacilityController();