import { Request, Response } from "express";
import { CompanyRepo } from "../repositoryBackOffice/CompanyRepo";
import { Company } from "../models/Company";
class CompanyController {
  // create Company object (Controller)

  async create(req: Request, res: Response) {
    console.log(req.body)
    try {
      const savedCompany = await new CompanyRepo().save(req.body);


      res.status(201).json({

        status: "Created! ",
        message: "Successfully created Company!",
        data: {
          companyId: savedCompany.companyId // Assurez-vous que c'est le bon nom de champ
        }

      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }
  async checkUnique(req: Request, res: Response) {
    try {

      const userCheck = await new CompanyRepo().checkEin(req.params["companyEIN"]);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully found user user!",
        data: userCheck
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }

  async IsactiveCompany(req: Request, res: Response) {
    try {
      const companyId = parseInt(req.params.companyId);
      const updatedCompany = await new CompanyRepo().Update(companyId);

      res.status(200).json({
        status: "Success",
        message: `Company status updated successfully!`,
        data: {
          companyId: updatedCompany.companyId,
          companyIsActive: updatedCompany.companyIsActive
        }
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }


  async getAll(req: Request, res: Response) {
    try {
      const companys = await new CompanyRepo().retrieveAll();
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully fetched all Company data!",
        data: companys,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }
  async deleteTotal(req: Request, res: Response) {
    try {
      Company.destroy({ where: req.body.companyId});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during the deletion process." });
    };
  };

}
export default new CompanyController();
