import BaseRoutes from "./base/BaseRouter";
import { upload } from "../middleware/upload";
import PhotoVehicleController from "../controllerBackOffice/PhotoVehicleController";

class PhotoVehicleRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create",upload.single('photoVehicleName'),  PhotoVehicleController.createPhotoVehicle);
    this.router.patch("/update/:photoVehicleId",upload.single('photoVehicleName'),  PhotoVehicleController.updatePhotoVehicle);
    this.router.get("/getPhotoVehicle/:vehicleId",  PhotoVehicleController.getAllPhotoUnitByVehicleId);
  }}
export default new PhotoVehicleRoutes().router;