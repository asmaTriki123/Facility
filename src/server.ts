import express, { Application, Request, Response } from "express";
import cors from 'cors';
import Database from "./config/database";
import bodyParser from 'body-parser';
import 'reflect-metadata';
import MaillingRouter from "./routerBackoffice/MaillingRouter";
import SettingsRouter from "./routerBackoffice/SettingsRouter";
import CoordinateRouter from "./routerBackoffice/CoordinateRouter";
import HolidaysRouter from "./routerBackoffice/HolidaysRouter";
import TypeUnitRouter from "./routerBackoffice/TypeUnitRouter";
import UserRouter from "./routerBackoffice/UserRouter";
import RoleRouter from "./routerBackoffice/RoleRouter";
import UnitRouter from "./routerBackoffice/UnitRouter";
import HoursRouter from "./routerBackoffice/HoursRouter";
import AmenitiesRouter from "./routerBackoffice/AmenitiesRouter";
import PhotosFacilityRouter from "./routerBackoffice/PhotosFacilityRouter";
import PhotoUnitRouter from "./routerBackoffice/PhotoUnitRouter";
import FacilityRouter from "./routerBackoffice/FacilityRouter";
import FacilityManagementRouter from "./routerBackoffice/FacilityManagementRouter";
import RentRouter from "./routerBackoffice/RentRouter";
import CategoryUnitRouter from "./routerBackoffice/CategoryUnitRouter";
import CategoryUnit_UnitRouter from "./routerBackoffice/CategoryUnit_UnitRouter";
import VehicleRouter from "./routerBackoffice/VehicleRouter";
import SocialMediaRouter from "./routerBackoffice/SocialMediaRouter";
import SocialMedia_FacilityRouter from "./routerBackoffice/SocialMediaFacilityRouter";
import PhotoVehicleRouter from "./routerBackoffice/PhotoVehicleRouter";
import UnitSpecificAmenitiesRouter from "./routerBackoffice/UnitSpecificAmenitiesRouter";
import AmenitiesUnitRouter from "./routerBackoffice/AmenitiesUnitRouter";
import CompanyRouter from "./routerBackoffice/CompanyRouter";
import AmenitiesFacilityRouter from "./routerBackoffice/AmenitiesFacilityRouter";
import HolidayFacilityRouter from "./routerBackoffice/HolidayFacilityRouter";
import AccessHoursRouter from "./routerBackoffice/AccessHoursRouter";
import { Hours } from "./models/Hours";
import EmailRouter from "./routerBackoffice/EmailRouter";
import DashbordRouter from "./routerBackoffice/DashbordRouter";
import AgreementRouter from "./routerBackoffice/AgreementRouter";
import path from 'path';
import { CronService } from './service/CronService';
import fileUpload from 'express-fileupload';
import WaittingListRouter from "./routerBackoffice/WaittingListRouter";
import DiagramRouter from "./routerBackoffice/DiagramRouter";
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugins();
    this.databaseSync();
    this.routes();
  }
  protected plugins(): void {
    const corsOptions = {
      origin: '*',
      methods: '*',
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  }
  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }
  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome to node js ");
    });
    new CronService();
    this.app.use(express.static('public'));
    //this.app.use('/uploads', express.static('public/uploads'));
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/email", EmailRouter);
    this.app.use("/api/role", RoleRouter);
    this.app.use("/api/form", MaillingRouter);
    this.app.use("/api/setting", SettingsRouter);
    this.app.use("/api/coordinate", CoordinateRouter);
    this.app.use("/api/holidays", HolidaysRouter);
    this.app.use("/api/hours", HoursRouter);
    this.app.use("/api/typeunit", TypeUnitRouter);
    this.app.use("/api/amenities", AmenitiesRouter);
    this.app.use("/api/photosfacility", PhotosFacilityRouter);
    this.app.use("/api/unit", UnitRouter);
    this.app.use("/api/photounit", PhotoUnitRouter);
    this.app.use("/api/facility", FacilityRouter);
    this.app.use("/api/facilitymanagement", FacilityManagementRouter);
    this.app.use("/api/rent", RentRouter);
    this.app.use("/api/categoryunit", CategoryUnitRouter);
    this.app.use("/api/categoryunitunit", CategoryUnit_UnitRouter);
    this.app.use("/api/amenitiesfacility", AmenitiesFacilityRouter);
    this.app.use("/api/vehicle", VehicleRouter);
    this.app.use("/api/socialmedia", SocialMediaRouter);
    this.app.use("/api/socialmediafacility", SocialMedia_FacilityRouter);
    this.app.use("/api/photovehicle", PhotoVehicleRouter);
    this.app.use("/api/unitspecificamenities", UnitSpecificAmenitiesRouter);
    this.app.use("/api/amenitiesunit", AmenitiesUnitRouter);
    this.app.use("/api/company", CompanyRouter);
    this.app.use("/api/holidaysfacility", HolidayFacilityRouter);
    this.app.use("/api/hoursAccess", AccessHoursRouter);
    this.app.use("/api/dashbord", DashbordRouter);
    this.app.use("/api/Agreement", AgreementRouter);
    this.app.use("/api/WattingList", WaittingListRouter);
      this.app.use("/api/diagrams", DiagramRouter);
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(fileUpload());
  }
}

const app = new App().app;
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});