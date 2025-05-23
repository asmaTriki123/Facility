import { Settings } from "../models/Settings";
import { TimeZoneService } from '../middleware/TimeZone';
import { UpdatedAt } from "sequelize-typescript";
import { create } from "node:domain";

interface ISettingsRepo {

    update(settings: Settings): Promise<Settings>;
    retrieveAll(): Promise<Settings[]>;
    retrieveByCreatedBy(createdBy: string): Promise<Settings>
}

export class SettingsRepo implements ISettingsRepo {

    async save(setting: Settings): Promise<Settings> {
        try {
            const savedSettings = await Settings.create({
                settingsPhone: setting.settingsPhone,
                settingsDate: setting.settingsDate,
                settingsBilingPeriod: setting.settingsBilingPeriod,
                settingsCurrency: setting.settingsCurrency,
                UpdatedBy: setting.updatedBy,
                createdBy: setting.createdBy,
                createdAt:  new Date(),
                isDeleted: false,
            });

            return  savedSettings;
        } catch (error) {
            throw new Error("Failed to create unit!" + error);
        }
    }
    // update Settings object (Repo)

    async update(settings: Settings): Promise<Settings> {
        try {
            const existingSettings = await Settings.findOne({
                where: { SettingsId: settings.settingsId },
            });
            if (!existingSettings) {
                throw new Error("Settings not found!");
            }
            existingSettings.settingsCurrency = settings.settingsCurrency;
            existingSettings.settingsDate = settings.settingsDate
            existingSettings.settingsPhone = settings.settingsPhone;
            existingSettings.settingsBilingPeriod = settings.settingsBilingPeriod;
            existingSettings.updatedBy = settings.updatedBy;
            existingSettings.updatedAt = new Date();
            await existingSettings.save();
            return existingSettings;
        } catch (error) {
            throw new Error("Failed to update Settings! " + error);
        }
    }


    // UpdatedBy

     async update2(settings: Settings): Promise<Settings> {
        try {
            const existingSettings = await Settings.findOne({
                where: { createdBy: settings.createdBy },
            });
            if (!existingSettings) {
                throw new Error("Settings not found!");
            }
            existingSettings.settingsCurrency = settings.settingsCurrency;
            existingSettings.settingsDate = settings.settingsDate
            existingSettings.settingsPhone = settings.settingsPhone;
            existingSettings.settingsBilingPeriod = settings.settingsBilingPeriod;
            existingSettings.updatedBy = settings.updatedBy;
            existingSettings.updatedAt = new Date();
            await existingSettings.save();
            return existingSettings;
        } catch (error) {
            throw new Error("Failed to update Settings! " + error);
        }
    }
    // find All By facilityId Settings object (Repo)

    async retrieveAll(): Promise<Settings[]> {
        try {
            return await Settings.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve all Settings: ${error}`);
        }
    }



    //retrieveByCreatedBy


  async retrieveByCreatedBy(createdBy: string): Promise<Settings> {
  try {
    const setting = await Settings.findOne({  // Changed from findAll to findOne
      where: {
        createdBy: createdBy,
      },
    });

    if (!setting) {
      throw new Error(`No setting found for this createdBy ${createdBy}!`);
    }

    return setting; 
  } catch (error) {
    throw new Error("Failed to find setting by createdBy: " + error);
  }
}



    // // delete Settings object (Repo)

    // async delete(SettingsId: number, deletedBy: number): Promise<Settings> {
    //     try {
    //         const SettingsToDelete = await Settings.findOne({
    //             where: { SettingsId: SettingsId },
    //         });
    //         if (!SettingsToDelete) {
    //             throw new Error("Settings not found!");
    //         }
    //         SettingsToDelete.isDeleted = true;
    //         SettingsToDelete.deletedBy = deletedBy;
    //         const adjustedTime = await new TimeZoneService().getAdjustedTime(SettingsToDelete.facilityId);
    //         if (adjustedTime !== null) {
    //             SettingsToDelete.deletedAt = adjustedTime;
    //         }
    //         await SettingsToDelete.save();
    //         return SettingsToDelete;
    //     } catch (error) {
    //         throw new Error("Failed to soft delete Settings! " + error);
    //     }
    // }
}
