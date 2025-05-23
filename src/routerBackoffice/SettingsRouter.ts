import BaseRoutes from "./base/BaseRouter";
import SettingsController from "../controllerBackOffice/SettingsController";
import { auth } from "../middleware/AuthMilddleware";

class SettingsRoutes extends BaseRoutes {
  public routes(): void {
    
    this.router.get("/all", SettingsController.findAll);
    //this.router.post("/create",auth("/api/setting/all"), SettingsController.findAll);

    this.router.get("/SettingCreatedBy/:createdBy", SettingsController.findByCreatedBy);
    this.router.post("/create",SettingsController.create);
    this.router.patch("/update/:settingsId", SettingsController.update);
    this.router.patch("/updateBycreatedBy/createdBy/:createdBy", SettingsController.updateBycreatedBy);
  }
}
export default new SettingsRoutes().router;