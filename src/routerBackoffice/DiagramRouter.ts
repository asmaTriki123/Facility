import { Router } from "express";
import DiagramController from "../controllerBackOffice/DiagramController";
import { auth } from "../middleware/AuthMilddleware";
import BaseRoutes from "./base/BaseRouter";
class DiagramRoutes extends BaseRoutes {
  public routes(): void {
        // Ajoutez le middleware d'authentification
        this.router.post("/save", auth(["manager","admin"]), (req, res) => {
            DiagramController.saveDiagram(req as any, res);
        });
        
        this.router.get("/:facilityId", auth(["manager","admin"]), (req, res) => {
            DiagramController.getDiagram(req as any, res);
        });
    }
}

export default new DiagramRoutes().router;