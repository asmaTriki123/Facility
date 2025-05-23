import { Model, Table, PrimaryKey, DataType, Column, AutoIncrement, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PhotoVehicle } from "./PhotoVehicle";
import { Rent } from "./Rent";
@Table({
  tableName: Vehicle.vehicleTableName,
  timestamps: false,
})
export class Vehicle extends Model {
public static vehicleTableName = "vehicle" as string;
public static vehicleId = "vehicleId" as string;
public static vehicleVIN = "vehicleVIN" as string;
public static vehicleModel = "vehicleModel" as string;
public static vehicleType = "vehicleType" as string;
public static vehicleCategory = "vehicleCategory" as string;
public static vehicleConfirmed = "vehicleConfirmed" as string;
public static vehiclePlateTagNumber = "vehiclePlateTagNumber" as string;
//public static vehicleRegistrationPhoto = "vehicleRegistrationPhoto" as string;
public static rentId = "rentId" as string
public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static deletedAt = "deletedAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static createdAt = "createdAt" as string;

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: Vehicle.vehicleId,
    allowNull: false,
  })

  vehicleId!: number;


  @HasMany(() => PhotoVehicle)
    photoVehicle!: PhotoVehicle[];
    

  @ForeignKey(() => Rent)
  @Column({
    type: DataType.INTEGER,
    field: Vehicle.rentId,
  })
  rentId!: number;

  @BelongsTo(() => Rent)
  rent!: Rent;



   @Column({
    type: DataType.STRING,
    field: Vehicle.vehicleVIN,
    allowNull: false,
  })

  vehicleVIN!: string;

  @Column({
    type: DataType.STRING,
    field: Vehicle.vehicleModel,
    allowNull: false,
  })

  vehicleModel!: string;

  @Column({
    type: DataType.STRING,
    field: Vehicle.vehicleType,
    allowNull: false,
  })

  vehicleType!: string;

  @Column({
    type: DataType.STRING,
    field: Vehicle.vehicleCategory,
    allowNull: false,
  })

  vehicleCategory!: string;


  @Column({
    type: DataType.BOOLEAN,
    field: Vehicle.vehicleConfirmed,
    allowNull: true,
  })

  vehicleConfirmed!: boolean;


  @Column({
    type: DataType.INTEGER,
    field: Vehicle.vehiclePlateTagNumber,
    allowNull: false,
  })

  vehiclePlateTagNumber!: number;


  
 /* @Column({
    type: DataType.STRING,
    field: Vehicle.vehicleRegistrationPhoto,
    allowNull: false,
  })
  vehicleRegistrationPhoto!: string | null;*/

  @Column({
    type: DataType.INTEGER,
    field: Vehicle.createdBy,
    allowNull: true,
  })
  createdBy!: number;


  @Column({
    type: DataType.INTEGER,
    field: Vehicle.updatedBy,
    allowNull: true,
  })
  updatedBy!: number;

  @Column({
    type: DataType.INTEGER,
    field: Vehicle.deletedBy,
    allowNull: true,
  })
  deletedBy!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: Vehicle.isDeleted,
    allowNull: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Vehicle.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Vehicle.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Vehicle.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}