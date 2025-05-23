import EmailController from "../controllerBackOffice/EmailController";
import BaseRoutes from "./base/BaseRouter";

class HoursRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/check", EmailController.VerifierEmail);
  }
}
export default new HoursRoutes().router;