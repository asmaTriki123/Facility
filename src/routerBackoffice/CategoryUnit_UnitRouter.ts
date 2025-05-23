import CategoryUnitUnitController from "../controllerBackOffice/CategoryUnit_UnitController";
import BaseRoutes from "./base/BaseRouter";
class CategoryUnit_UnitRouter extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", CategoryUnitUnitController.create);
    this.router.patch("/update/:unitId", CategoryUnitUnitController.update);

  }
}
export default new CategoryUnit_UnitRouter().router;