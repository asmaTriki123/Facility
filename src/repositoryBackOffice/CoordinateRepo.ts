import { Coordinate } from "../models/Coordinate";
import { TimeZoneService } from '../middleware/TimeZone';
interface ICoordinateRepo {
    save(coordinate: Coordinate): Promise<Coordinate>;
    update(coordinate: Coordinate): Promise<Coordinate>;
    delete(coordinateId: number, deleteBy: string): Promise<Coordinate>;
    //   retrieveById(CoordinateId: number): Promise<Coordinate>;
    retrieveAll(facilityId: number): Promise<Coordinate[]>;
}
export class CoordinateRepo implements ICoordinateRepo {
    //  saved Coordinate object (Repo)
    async save(coordinate: Coordinate): Promise<Coordinate> {

        try {
            console.log('coordinate', coordinate)
            const savedCoordinate = await Coordinate.create({
                facilityId: coordinate.facilityId,
                coordinateAddress: coordinate.coordinateAddress,
                coordinateCity: coordinate.coordinateCity,
                coordinateState: coordinate.coordinateState,
                coordinateZip: coordinate.coordinateZip,
                createdBy: coordinate.createdBy,
                isDeleted: false,
                createdAt: await new TimeZoneService().getAdjustedTime(coordinate.facilityId),
                updatedAt: await new TimeZoneService().getAdjustedTime(coordinate.facilityId)
            });
            return savedCoordinate;
        } catch (error) {
            throw new Error("Failed to create Coordinate!" + error);
        }
    }
    //  update Coordinate object (Repo)
    async update(coordinate: Coordinate): Promise<Coordinate> {

        try {
            const new_Coordinate = await Coordinate.findOne({
                where: {
                    coordinateId: coordinate.coordinateId,
                },
            });
            if (!new_Coordinate) {
                throw new Error("Coordinate not found!");
            }
            new_Coordinate.coordinateAddress = coordinate.coordinateAddress,
                new_Coordinate.coordinateCity = coordinate.coordinateCity,
                new_Coordinate.coordinateState = coordinate.coordinateState,
                new_Coordinate.coordinateZip = coordinate.coordinateZip,
                new_Coordinate.updatedBy = coordinate.updatedBy,
                new_Coordinate.updatedAt = await new TimeZoneService().getAdjustedTime(new_Coordinate.facilityId) ?? new_Coordinate.updatedAt;
            await new_Coordinate.save();
            return new_Coordinate;
        } catch (error) {
            throw new Error("Failed to update Coordinate!" + error);
        }
    }
    // retrieveAll Coordinate object (Repo)
    async retrieveAll(facilityId: number): Promise<Coordinate[]> {
        try {
            return await Coordinate.findAll({
                where: {
                    isDeleted: false,
                    facilityId: facilityId
                },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve all Coordinate: ${error}`);
        }
    }
    // delete Coordinate object (Repo)
    async delete(coordinateId: number, deleteBy: string): Promise<Coordinate> {
        try {
            const CoordinateToDelete = await Coordinate.findOne({
                where: {
                    coordinateId: coordinateId,
                },
            });
            if (!CoordinateToDelete) {
                throw new Error("Coordinate not found!");
            }
            CoordinateToDelete.isDeleted = true;
            CoordinateToDelete.deletedBy = deleteBy
            const adjustedTime = await new TimeZoneService().getAdjustedTime(CoordinateToDelete.facilityId);
            if (adjustedTime !== null) {
                CoordinateToDelete.deletedAt = adjustedTime;
            }
            await CoordinateToDelete.save();
            return CoordinateToDelete;

        } catch (error) {
            throw new Error("Failed to soft delete Coordinate! " + error);
        }
    }
    //   async retrieveById(CoordinateId: number): Promise<Coordinate> {
    //     try {
    //       const new_Coordinate = await Coordinate.findOne({
    //         where: {
    //           CoordinateId: CoordinateId,
    //         },
    //       });
    //       if (!new_Coordinate) {
    //         throw new Error("Coordinate not found!");
    //       }
    //       if (new_Coordinate.isDeleted === 1) {
    //         throw new Error(`Coordinate with ID ${CoordinateId} is marked as deleted!`);
    //       }
    //       return new_Coordinate;
    //     } catch (error) {
    //       throw new Error("Failed to find  Coordinate by id!" + error);
    //     }
    //   }

    // async countSousCoordinatesByIdCoordinate(CoordinateId: number): Promise<number> {
    //   try {
    //     return await SousCoordinate.count({
    //       where: {
    //         CoordinateId: CoordinateId,
    //         isDeleted: 0
    //       },
    //     });
    //   } catch (error) {
    //     throw new Error(`Failed to count sous-Coordinates for CoordinateId ${CoordinateId}: ${error}`);
    //   }
    // }
}