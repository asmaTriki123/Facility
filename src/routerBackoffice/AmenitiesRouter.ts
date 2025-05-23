import AmenitiesController from "../controllerBackOffice/AmenitiesController";
import { auth } from "../middleware/AuthMilddleware";
import { Request, Response } from 'express';
import BaseRoutes from "./base/BaseRouter";
class AmenitiesRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", AmenitiesController.create);
    this.router.patch("/update/:amenitiesId", AmenitiesController.update);
this.router.delete("/delete/:amenitiesId", AmenitiesController.delete);
    this.router.get("/all",  AmenitiesController.findAll);
    this.router.get("/allByAdmin", AmenitiesController.findAllByAdmin);
    this.router.get("/GroupedbySection", AmenitiesController.GroupedbySection);
    this.router.get("/allForUpdate/:facilityId", AmenitiesController.GetAmenitiesByFacility);
  }
}
export default new AmenitiesRoutes().router;
