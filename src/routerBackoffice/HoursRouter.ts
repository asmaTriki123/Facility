import HoursController from "../controllerBackOffice/HoursController";
import { auth } from "../middleware/AuthMilddleware";
import BaseRoutes from "./base/BaseRouter";

class HoursRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", HoursController.create);
    this.router.patch("/update/:hoursId", HoursController.update);
    this.router.delete("/delete/:hoursId", HoursController.delete);
    this.router.get("/all/:facilityId", HoursController.findAll);
  }
}
export default new HoursRoutes().router;