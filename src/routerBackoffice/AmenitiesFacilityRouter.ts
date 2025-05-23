import AmenitiesFacilityController from "../controllerBackOffice/AmenitiesFacilityController";
import BaseRoutes from "./base/BaseRouter";
class AmenitiesFacilityRouter extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", AmenitiesFacilityController.create);
    this.router.patch("/update/:amenitiesfacilityId", AmenitiesFacilityController.update);
    

  }
}
export default new AmenitiesFacilityRouter().router;