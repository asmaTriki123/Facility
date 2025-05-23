import BaseRoutes from "./base/BaseRouter";
import SocialMediaController from "../controllerBackOffice/SocialMediaController";
class SocialMediaRoutes extends BaseRoutes {
  public routes(): void {
      this.router.post("/create", SocialMediaController.createSocialMedia);
      this.router.patch("/update/:socialMediaId", SocialMediaController.updateSocialMedia);
      this.router.get("/getByCreatedBy/:createdBy", SocialMediaController.findAllSocialMediaById);
  }

}

export default new SocialMediaRoutes().router;