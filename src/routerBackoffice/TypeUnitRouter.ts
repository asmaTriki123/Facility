import BaseRoutes from "./base/BaseRouter";
import TypeUnitController from "../controllerBackOffice/TypeUnitController";
import { upload } from "../middleware/upload";
import { CategoryUnitUnit } from "../models/CategoryUnit_Unit";
class TypeUnitRoutes extends BaseRoutes {
  public routes(): void {

    this.router.post("/create", upload.single('typeUnitPhoto'), TypeUnitController.create);
    this.router.patch("/update/:typeUnitId",upload.single('typeUnitPhoto'), TypeUnitController.update);
    this.router.get('/all/:companyId', TypeUnitController.findAll);
    this.router.delete('/delete/:typeUnitId', TypeUnitController.delete);
    this.router.get('/getAllTypeUnitByFacility/:facilityId', TypeUnitController.getAllTypeUnitByFacility);
    /*
this.router.get(
    '/getTypeUnitbyRent/:categoryUnitId/:typeUnitId/:rentMoveIn/:rentMoveOut',
    (req, res) => TypeUnitController.getTypeUnitbyRent(req, res)
);*/

this.router.get(
    '/getTypeUnitbyRent/:categoryUnitId/:typeUnitIds/:rentMoveIn/:rentMoveOut',
    (req, res) => TypeUnitController.getTypeUnitbyRent(req, res)
);

        this.router.get('/getTypeUnitbyCatgeory/:categoryUnitId', TypeUnitController.getTypeUnitbyCatgeory);
    this.router.get("/type-units/company/:companyId", (req, res) =>
  TypeUnitController.getTypeUnitsByCompanyId(req, res)
);

  }

}

export default new TypeUnitRoutes().router;
