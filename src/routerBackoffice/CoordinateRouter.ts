import CoordinateController from "../controllerBackOffice/CoordinateController";
import BaseRoutes from "./base/BaseRouter";

class CoordinateRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", CoordinateController.create);
    this.router.patch("/update/:coordinateId", CoordinateController.update);
    this.router.delete("/delete/:coordinateId", CoordinateController.delete);
    this.router.get("/all/:facilityId", CoordinateController.findAll);
  }
}
export default new CoordinateRoutes().router;