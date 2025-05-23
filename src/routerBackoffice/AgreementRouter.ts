import AgreementControlller from "../controllerBackOffice/AgreementControlller";
import BaseRoutes from "./base/BaseRouter";

class AgreementRouter extends BaseRoutes {
  public routes(): void {
       this.router.post("/create", AgreementControlller.create);
        this.router.get("/recuprer", AgreementControlller.getAll);
    this.router.patch('/update/:AgreementId', AgreementControlller.update);
this.router.get('/get/getByIdAgrement/:AgreementId', AgreementControlller.GetById);
  }
}
export default new AgreementRouter().router;