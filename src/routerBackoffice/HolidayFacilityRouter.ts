import BaseRoutes from "./base/BaseRouter";
import HolidayFacilityController from "../controllerBackOffice/HolidayFacilityController";

class HolidaysFacilityRoutes extends BaseRoutes {
   public routes(): void {
      this.router.post("/Add", HolidayFacilityController.create);
         this.router.patch("/update/:holidaysfacilityId", HolidayFacilityController.update);
     
   }
}

export default new HolidaysFacilityRoutes().router;