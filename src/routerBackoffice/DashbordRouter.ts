import BaseRoutes from "./base/BaseRouter";
import DashboardController  from './../controllerBackOffice/DashbordController';
import { auth } from "../middleware/AuthMilddleware";

class DasbordRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/stats", DashboardController.getStats);
    
  }
}
export default new DasbordRoutes().router;