import RentController from "../controllerBackOffice/RentController";
import { auth } from "../middleware/AuthMilddleware";
import BaseRoutes from "./base/BaseRouter";
import { uploadContract } from "../middleware/upload2";
class RentRoutes extends BaseRoutes {
  public routes(): void {
  //  this.router.post("/create/:facilityId", RentController.create);
  this.router.post("/create/:facilityId", uploadContract, RentController.create);
     this.router.patch("/update/:rentId", RentController.update);
    // this.router.delete("/delete/:hoursId", RentController.delete);
     this.router.get("/all", RentController.findAll);
    this.router.get("/Agrement/:companyId", RentController.getAgrement);

    this.router.post('/rents/check-expired', RentController.checkExpiredRents.bind(RentController));
    
  }
}
export default new RentRoutes().router;