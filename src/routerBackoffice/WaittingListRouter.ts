import BaseRoutes from "./base/BaseRouter";
import WaittingListController from "../controllerBackOffice/WaittingListController";

import { upload } from "../middleware/upload";
class WattingListRoutes extends BaseRoutes {
  public routes(): void {
   

 this.router.post("/create",
      upload.fields([
        { name: 'userPhoto', maxCount: 1 },
        { name: 'userDriverUrl', maxCount: 1 }
      ]),
      WaittingListController.createWattingUser
    );

 this.router.get("/getwittingList/:facilityId", WaittingListController.getAllWaitingListByFacility);
this.router.put("/delete/deleteOne/:WaittingListId", WaittingListController.deleteOne);
  }
}

export default new WattingListRoutes().router;