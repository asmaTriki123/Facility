import AmenitiesUnitController from "../controllerBackOffice/AmenitiesUnitController";
import BaseRoutes from "./base/BaseRouter";
import { auth } from "../middleware/AuthMilddleware";
class AmenitiesUnitRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/Add",  AmenitiesUnitController.create);
    this.router.get("/getAllAmentiesUnit/:unitId", AmenitiesUnitController.getAllAmentiesUnit);
    this.router.patch("/update/:amenitiesunitId",AmenitiesUnitController.updateAmentiesUnit);
  }
}
export default new AmenitiesUnitRoutes().router;
