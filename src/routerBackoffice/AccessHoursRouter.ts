import AccessHoursController from "../controllerBackOffice/AccessHoursController";
import HoursController from "../controllerBackOffice/HoursController";
import BaseRoutes from "./base/BaseRouter";

class HoursRoutes extends BaseRoutes {
  public routes(): void {
    this.router.patch("/update/:AccessHoursId", AccessHoursController.update);
    this.router.get("/all/:facilityId", AccessHoursController.findAll);
     this.router.post("/create", AccessHoursController.Create);
  }
}
export default new HoursRoutes().router;