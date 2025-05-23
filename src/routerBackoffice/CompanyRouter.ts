import CompanyController from "../controllerBackOffice/CompanyController";
import BaseRoutes from "./base/BaseRouter";
import { auth } from "../middleware/AuthMilddleware";
class CompanyRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", CompanyController.create);
    this.router.get("/check/:companyEIN", CompanyController.checkUnique);
    this.router.patch("/upadte/:companyId", CompanyController.IsactiveCompany);
    this.router.get("/", CompanyController.getAll);
    this.router.delete("/deleteTotal", CompanyController.deleteTotal);

  }
}
export default new CompanyRoutes().router;