import { Request, Response } from "express";

import { Settings } from "../models/Settings";
import { SettingsRepo } from "../repositoryBackOffice/SettingsRepo";
class SettingsController {

    //   async findAll(req: Request, res: Response) {

    //       try {
    //         const settings= await  Settings.findAll();

    //       function formatDate(date:any, format:any) {
    //           const d = new Date(date);
    //           const year = d.getFullYear();
    //           const month = String(d.getMonth() + 1).padStart(2, '0');
    //           const day = String(d.getDate()).padStart(2, '0');

    //           switch (format) {
    //               case "YYYY-MM-DD":
    //                   return `${year}-${month}-${day}`;
    //               case "DD/MM/YYYY":
    //                   return `${day}/${month}/${year}`;
    //               case "MM-DD-YYYY":
    //                   return `${month}-${day}-${year}`;
    //               default:
    //                   return `${year}-${month}-${day}`; 
    //           }
    //       }
    //       let dateUpdate = formatDate("2025-02-12","DD/MM/YYYY")
    //         console.log('settings')
    //     res.status(200).json({
    //         status: "Ok! ",
    //         message: "Successfully fetched all settings!",
    //         data: settings,
    //       });
    //     }
    //      catch (err) {
    //       res.status(500).json({
    //         status: "Internal Server Error! ",
    //         message: "Internal Server Error!" + err,
    //       });
    //     }
    //   }
    
    // findAll settings object (Controller)

    async create(req: Request, res: Response) {
        try {           
            const savedSettings = await new SettingsRepo().save(req.body);
            res.status(201).json({
                status: "Created! ",
                message: "Successfully created settings!",
                data: savedSettings,

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
            const settingsAll = await new SettingsRepo().retrieveAll();

            res.status(200).json({
                status: "Ok! ",
                message: "Successfully fetched all settings!",
                data: settingsAll,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "Internal Server Error! ",
                message: "Internal Server Error!" + err,
            });
        }
    }
    // update settings object (Controller)
    async update(req: Request, res: Response) {
        try {
            const updated_settings = new Settings();
            updated_settings.settingsId = parseInt(req.params["settingsId"]);
            updated_settings.settingsCurrency = req.body.settingsCurrency;
            updated_settings.settingsDate = req.body.settingsDate;
            updated_settings.settingsPhone = req.body.settingsPhone;
            updated_settings.settingsBilingPeriod = req.body.settingsBilingPeriod;
            updated_settings.updatedBy = req.body.updatedBy;

            const updated = await new SettingsRepo().update(updated_settings);
            res.status(200).json({
                status: "Ok!",
                message: "Successfully updated settings data!",
                data: updated,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }


    //findByCreatedBy

     async findByCreatedBy(req: Request, res: Response): Promise<void> {
  try {
    const createdBy = req.params["createdBy"]; // Remove parseInt if createdBy is string
    const setting = await new SettingsRepo().retrieveByCreatedBy(createdBy);

    res.status(200).json({
      status: "Ok",
      message: "Successfully fetched setting by createdBy.",
      data: setting,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: `Failed to fetch setting: ${error instanceof Error ? error.message : error}`,
    });
  }
}


//updateBycreatedBy
    async updateBycreatedBy(req: Request, res: Response) {
        try {
            const updated_settings = new Settings();
            updated_settings.createdBy = req.params["createdBy"];
            updated_settings.settingsCurrency = req.body.settingsCurrency;
            updated_settings.settingsDate = req.body.settingsDate;
            updated_settings.settingsPhone = req.body.settingsPhone;
            updated_settings.settingsBilingPeriod = req.body.settingsBilingPeriod;
            updated_settings.updatedBy = req.body.updatedBy;

            const updated = await new SettingsRepo().update2(updated_settings);
            res.status(200).json({
                status: "Ok!",
                message: "Successfully updated settings data!",
                data: updated,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }
    
}



export default new SettingsController();
