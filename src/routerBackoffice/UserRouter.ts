import BaseRoutes from "./base/BaseRouter";
import UserController from "../controllerBackOffice/UserController";
import { upload } from "../middleware/upload";
import multer from 'multer';
import { auth } from "../middleware/AuthMilddleware";

// 
class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/login", UserController.login);
    //this.router.post("/create",upload.single('userPhoto'), upload.single('userDriverUrl'), UserController.create);
this.router.post('/send-activation-email', UserController.sendActivationEmail);
this.router.get('/activate-user', UserController.activateUser);
this.router.get('/deactivate-user', UserController.deactivateUser);

    this.router.post("/create",
      upload.fields([
        { name: 'userPhoto', maxCount: 1 },
        { name: 'userDriverUrl', maxCount: 1 }
      ]),
      UserController.create
    );
    /*this.router.post(
      '/create',
      upload2.fields([
        { name: 'userPhoto', maxCount: 1 },
        { name: 'userDriverUrl', maxCount: 1 }
      ]),
      UserController.create
    );*/
    //this.router.post("/create", upload.none(), UserController.create);
    // this.router.patch("/:userId",UserController.update);
    this.router.get("/check/:userIdentifier", UserController.checkUnique);
    this.router.patch("/password/:userEmail", UserController.updatePassword);
    // this.router.delete("/:userId", UserController.delete);
    this.router.delete("/deleteTotal",UserController.deleteTotal);
    
    // this.router.get("/all", UserController.findAll);
    this.router.get("/userId/:userId", UserController.findById);
    this.router.get("/permissions/:userEmail", UserController.findPermissions);

    this.router.get("/getAllUser/Manger_employee", UserController.getAllUser);
    this.router.patch("/Activer_desactiver/Update/:userId", UserController.Activer_desactiver);
    this.router.patch("/update/:userId", upload.fields([
      { name: 'userPhoto', maxCount: 1 },
      { name: 'userDriverUrl', maxCount: 1 },
    ]), UserController.updateUser);

  }
}
export default new UserRoutes().router;
