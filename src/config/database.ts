import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../models/User";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";
import { Facility } from "../models/Facility";
import { Amenities } from "../models/Amenities";
import { PhotosFacility } from "../models/PhotosFacility";
import { Unit } from "../models/Unit";
import { TypeUnit } from "../models/TypeUnit";
import { Coordinate } from "../models/Coordinate";
import { Hours } from "../models/Hours";
import { Holidays } from "../models/Holidays";
import { PhotoUnit } from "../models/PhotoUnit";
import { PermissionRole } from "../models/PermissionRole";
import { Settings } from './../models/Settings';
import { FacilityManagement } from "../models/FacilityManagement";
import { Rent } from "../models/Rent";
import { CategoryUnit } from "../models/CategoryUnit";
import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";
import { AmenitiesFacility } from './../models/AmenitiesFacility';
import { Vehicle } from "../models/Vehicle";
import { HolidaysFacility } from './../models/HolidaysFacility';
import { SocialMedia } from "../models/SocialMedia";
import { SocialMediaFacility } from "../models/SocialMedia_Facility";
import { PhotoVehicle } from "../models/PhotoVehicle";
import { UnitSpecificAmenities } from "../models/UnitSpecificAmenities";
import { AmenitiesUnit } from "../models/AmenitiesUnit";
import { Company } from "../models/Company";
import { AccessHours } from "../models/AccessHours";
import { Agreement } from "../models/Agreement";
import { WaittingList } from "../models/WaittingList";
import { Diagram } from "../models/Diagram";
dotenv.config({ path: '.env' });
class Database {
  private static instance: Database;
  public sequelize: Sequelize | undefined;
  private SQL_DB = process.env.SQL_DB as string;
  private SQL_HOST = process.env.SQL_HOST as string;
  private SQL_PORT = process.env.SQL_PORT as unknown as number;
  private SQL_USER = process.env.SQL_USER as unknown as string;
  private SQL_PASSWORD = process.env.SQL_PASSWORD as unknown as string;
  constructor() {
    this.connectToSQL();

  }
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  private async connectToSQL() {
    this.sequelize = new Sequelize({
      database: this.SQL_DB,
      username: this.SQL_USER,
      password: this.SQL_PASSWORD,
      host: this.SQL_HOST,
      port: this.SQL_PORT,
      dialect: "mysql",
      timezone: '+00:00',
      models: [Company,SocialMedia,SocialMediaFacility,HolidaysFacility,AmenitiesFacility,Rent, FacilityManagement, Settings, User, PermissionRole, Role, Permission, Facility, Amenities, PhotosFacility, Unit, TypeUnit, Coordinate, Hours, Holidays, PhotoUnit, CategoryUnit, CategoryUnitUnit,Vehicle,PhotoVehicle, UnitSpecificAmenities, AmenitiesUnit,AccessHours, Agreement, WaittingList, Diagram]
    });
    this.sequelize.sync({ alter: true }) 
      .then(() => {
        console.log('La base de données a été synchronisée avec succès');
      })
      .catch((error) => {
        console.error('Erreur de synchronisation de la base de données:', error);
      });
    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PhpMyAdmin Connection has been established successfully"
        );
      })
      .catch((err) => {
        console.log("❎Unable to connect to the PhpMyAdmin database ", err);
      });
  }
}
export default Database;
