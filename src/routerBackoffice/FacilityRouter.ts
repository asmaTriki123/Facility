import BaseRoutes from "./base/BaseRouter";
import FacilityController from "../controllerBackOffice/FacilityController"
import { auth } from "../middleware/AuthMilddleware";
class FacilityRoutes extends BaseRoutes {
   public routes(): void {
      this.router.post("/Add", FacilityController.create);
      this.router.get("/oneFacility/:facilityId", FacilityController.findOne);
      this.router.get("/all", FacilityController.findAll);
      this.router.get("/allByUser/:userId", FacilityController.findAllByUser);
      this.router.patch("/delete/:facilityId", FacilityController.delete);
      this.router.get("/getOneForAdmin/:facilityId", FacilityController.findOneForAdmin);
      this.router.patch("/update/:facilityId", FacilityController.update);
      this.router.get("/company/:companyId/facilities",FacilityController.getFacilitiesByCompanyId);
      this.router.delete("/deleteTotalWithRefernce",FacilityController.deleteWithReference);

   }
}

export default new FacilityRoutes().router; 