import HolidaysController from "../controllerBackOffice/HolidaysController";
import BaseRoutes from "./base/BaseRouter";
import { auth } from "../middleware/AuthMilddleware";
class HolidaysRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", HolidaysController.create);
    this.router.patch("/update/:holidaysId", HolidaysController.update);
    this.router.delete("/delete/:holidaysId", HolidaysController.delete);
    this.router.get("/all", HolidaysController.findAll);
    this.router.get("/allByAdmin", HolidaysController.findAllByAdmin);
    this.router.get("/holidaysCountry/:holidaysCountry", HolidaysController.findAllByholidaysCountry);
    this.router.get("/countryAvailable/:holidaysCountry", HolidaysController.findAllByholidaysCountryAvailable);

  }
}
export default new HolidaysRoutes().router;