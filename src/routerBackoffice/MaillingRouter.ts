import BaseRoutes from "./base/BaseRouter";
import MaillingController from "../controllerBackOffice/MaillingController";
import multer from "multer";

const upload = multer({ dest: "public/uploads/" }); 

class MaillingRoutes extends BaseRoutes {

  public routes(): void {
    this.router.post("/Mesure", MaillingController.MailSurMesure);
    this.router.post("/Form", upload.single("cv"), MaillingController.MailFormateur);
    this.router.post("/Inscription", MaillingController.MailInscription);
    this.router.post("/Sinscrire", MaillingController.Mailsinscrire);

  }
}
export default new MaillingRoutes().router;