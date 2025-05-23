import BaseRoutes from "./base/BaseRouter";
import UnitController from "../controllerBackOffice/UnitController";

class UnitRoutes extends BaseRoutes {
  public routes(): void {
   
    this.router.post("/create", UnitController.createUnit);
    this.router.patch("/update/:unitId",  UnitController.updateUnit);
    this.router.get("/getOne/:unitId",  UnitController.getUnit);
    //sans iamge
    this.router.get("/unitByFacility/:facilityId",  UnitController.getAllUnitByfacility);

    this.router.get("/getUnitsAndphotos/:unitId",  UnitController.getUnitsAndhotos);

    this.router.patch("/delete/:unitId",  UnitController.deleteUnit);

     this.router.get("/:facilityId/:unitId",  UnitController.getUnitByIdFacility);
 this.router.get("/getSortTypeUnit/facilityId/:facilityId", UnitController.getSortTypeUnit);
  }
}

export default new UnitRoutes().router;
