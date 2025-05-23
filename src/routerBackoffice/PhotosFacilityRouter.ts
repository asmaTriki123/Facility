import BaseRoutes from "./base/BaseRouter";
import FacilityPhotosController from "../controllerBackOffice/PhotosFacilityController";
import { upload } from "../middleware/upload";
import fs from 'fs';
import path from 'path';
import { PhotosFacility } from "../models/PhotosFacility";
class FacilityPhotosRoutes extends BaseRoutes {
  
  public routes(): void {
    
    this.router.post("/create", upload.single("photosfacilityName"), FacilityPhotosController.create);
    this.router.patch("/update/:photosfacilityId", upload.single("photosfacilityName"), FacilityPhotosController.update);
    this.router.get("/all/:facilityId", FacilityPhotosController.findAll);
    this.router.delete("/delete/:facilityId", FacilityPhotosController.delete);
    // Ajoutez cette route dans votre backend

    this.router.delete('/delete2/:id', async (req, res, ) => {
  try {
    await FacilityPhotosController.delete2(req, res);
  } catch (error) {
   
  }
});

this.router.put('/update/:id', async (req, res) => {
    try {
        const { photosfacilityType } = req.body;
        const photo = await PhotosFacility.update(
            { photosfacilityType },
            { where: { photosfacilityId: req.params.id } }
        );
        res.json(photo);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


  }
}

export default new FacilityPhotosRoutes().router;
