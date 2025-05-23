import RoleController from "../controllerBackOffice/RoleController";
import { auth } from "../middleware/AuthMilddleware";
import BaseRoutes from "./base/BaseRouter";
class RoleRoutes extends BaseRoutes {
  public routes(): void {
    // this.router.post("",auth("/api/role"), RoleController.create);
    // this.router.patch("/:id",auth("/api/role"), RoleController.update);
    // this.router.delete("/:id",auth("/api/role"), RoleController.delete);
    // this.router.get("/id/:id",auth("/api/role"), RoleController.findById);
    // this.router.get("/all",auth("/api/role"), RoleController.findAll);
  }
}
export default new RoleRoutes().router;


