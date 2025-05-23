import BaseRoutes from "./base/BaseRouter";
import PhotoUnitController from "../controllerBackOffice/PhotoUnitController";
import { upload } from "../middleware/upload";
import { PhotoUnit } from "../models/PhotoUnit";
class PhotoUnitRoutes extends BaseRoutes {
  public routes(): void {

    this.router.post("",upload.single('photoUnitName'),  PhotoUnitController.createPhotoUnit);
    this.router.patch("/:photoUnitId",upload.single('photoUnitName'),  PhotoUnitController.updatePhotoUnit);
    this.router.get("/getPhoto/:unitId",  PhotoUnitController.getAllPhotoUnitByFacilityId);
    this.router.delete("/delete/:unitId", PhotoUnitController.delete);
     this.router.delete('/delete2/:id', async (req, res, ) => {
     try {
       await PhotoUnitController.delete2(req, res);
     } catch (error) {
      
     }
   });

   this.router.put('/update/:id', async (req, res) => {
       try {
           const { photoUnitType } = req.body;
           const photo = await PhotoUnit.update(
               { photoUnitType },
               { where: { photoUnitId: req.params.id } }
           );
           res.json(photo);
       } catch (error) {
           res.status(500).json({ message: error });
       }
   });
  }}
export default new PhotoUnitRoutes().router;