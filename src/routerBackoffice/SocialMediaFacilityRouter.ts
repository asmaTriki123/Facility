import SocialMedia_FacilityController from "../controllerBackOffice/SocialMediaFacilityController";
import BaseRoutes from "./base/BaseRouter";

class SocialMedia_FacilityRoutes extends BaseRoutes {
  public routes(): void {
      this.router.post("/create", SocialMedia_FacilityController.createSocialMediaFacility);
    
  }

}

export default new SocialMedia_FacilityRoutes().router;