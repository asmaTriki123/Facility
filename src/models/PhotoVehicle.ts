import { Column, Table, PrimaryKey, DataType, Model, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Vehicle } from "./Vehicle";
@Table({
  tableName: PhotoVehicle.photoVehicleTableName,
  timestamps: false,
})

export class PhotoVehicle extends Model {
  public static photoVehicleTableName = "photoVehicle" as string;

  public static photoVehicleId = "photoVehicleId" as string;
  public static photoVehicleName = "photoVehicleName" as string;
  
  public static vehicleId = "vehicleId" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static deletedAt = "deletedAt" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: PhotoVehicle.photoVehicleId,
    allowNull: false
  })
  photoVehicleId!: number;

  @ForeignKey(() => Vehicle)
  @Column({
    type: DataType.INTEGER,
    field: PhotoVehicle.vehicleId,
  })
  vehicleId!: number;

  @BelongsTo(() => Vehicle)
  vehicle!: Vehicle;

  @Column({
    type: DataType.STRING,
    field: PhotoVehicle.photoVehicleName,
    allowNull: true,
  })
  photoVehicleName!:string | null;;
  @Column({
    type: DataType.STRING,
    field: PhotoVehicle.createdBy,
    allowNull: true,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: PhotoVehicle.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: PhotoVehicle.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: PhotoVehicle.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: PhotoVehicle.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PhotoVehicle.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PhotoVehicle.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}  
