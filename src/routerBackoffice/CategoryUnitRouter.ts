import BaseRoutes from "./base/BaseRouter";
import CategoryUnitController from "../controllerBackOffice/CategoryUnitController";
import { auth } from "../middleware/AuthMilddleware";
class CategoryUnitRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create",CategoryUnitController.create);
    this.router.patch("/:categoryUnitId", CategoryUnitController.update);
    this.router.get("/all", CategoryUnitController.getAllCategory);
    this.router.patch("/delete/:categoryUnitId", CategoryUnitController.delete); 

  }
}
export default new CategoryUnitRoutes().router;