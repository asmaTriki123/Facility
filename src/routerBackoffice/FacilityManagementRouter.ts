import FacilityManagementController from "../controllerBackOffice/FacilityManagementController";
import BaseRoutes from "./base/BaseRouter";

class FacilityManagementRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", FacilityManagementController.create);
    //this.router.patch("/update", FacilityManagementController.update);
    this.router.delete("/delete/:facilitymanagementId", FacilityManagementController.delete);
    //this.router.get("/all", FacilityManagementController.findAll);
  }
}
export default new FacilityManagementRoutes().router;
