import BaseRoutes from "./base/BaseRouter";
import VehicleController from "../controllerBackOffice/VehicleController";
import { upload } from "../middleware/upload";
class UnitRoutes extends BaseRoutes {
  public routes(): void {
   
    this.router.post("/create", VehicleController.createVehicle);
    this.router.patch("/update/:vehicleId", VehicleController.updateVehicle);
    this.router.get("/getByCreatedBy/:createdBy", VehicleController.getAllVehicle);
  }
}

export default new UnitRoutes().router;
