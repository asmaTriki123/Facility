import UnitSpecificAmenitiesController from "../controllerBackOffice/UnitSpecificAmenitiesController";
import BaseRoutes from "./base/BaseRouter";
class UnitSpecificAmenitiesRouter extends BaseRoutes {
  public routes(): void {
    this.router.post("/Add", UnitSpecificAmenitiesController.create);
    this.router.patch("/:UnitSpecificAmenitiesId", UnitSpecificAmenitiesController.update);
    this.router.get("/:createdBy", UnitSpecificAmenitiesController.getAllUnitSpecificAmenitieBycreatedBy);
    this.router.get("/getAll/getAllAmenitiesUnit", UnitSpecificAmenitiesController.getAllAmenitiesUnit);

      this.router.patch("/delete/:UnitSpecificAmenitiesId", async (req, res) => {
      await UnitSpecificAmenitiesController.delete(req, res);
    });
  }
}
export default new UnitSpecificAmenitiesRouter().router;