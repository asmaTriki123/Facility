import { Model, Table, PrimaryKey, DataType, Column, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { AmenitiesUnit } from "./AmenitiesUnit";
@Table({
  tableName: UnitSpecificAmenities.UnitSpecificAmenitiesTableName,
  timestamps: false,
})

export class UnitSpecificAmenities extends Model {
  public static UnitSpecificAmenitiesTableName = "UnitSpecificAmenities" as string;
  public static UnitSpecificAmenitiesId = "UnitSpecificAmenitiesId" as string
  public static UnitSpecificAmenitiesSection = "UnitSpecificAmenitiesSection" as string
  public static UnitSpecificAmenitiesOptionName = "UnitSpecificAmenitiesOptionName" as string
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static deletedAt = "deletedAt" as string;

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: UnitSpecificAmenities.UnitSpecificAmenitiesId,
    allowNull: false,
  })
  UnitSpecificAmenitiesId!: number;
 
@HasMany(() => AmenitiesUnit)
  amenitiesUnit!: AmenitiesUnit[];

  @Column({
    type: DataType.STRING,
    field: UnitSpecificAmenities.UnitSpecificAmenitiesSection,
    allowNull: false,
  })
  UnitSpecificAmenitiesSection!: number;

  @Column({
    type: DataType.STRING,
    field: UnitSpecificAmenities.UnitSpecificAmenitiesOptionName,
    allowNull: false,
  })
  UnitSpecificAmenitiesOptionName!: number;

  @Column({
    type: DataType.STRING,
    field: UnitSpecificAmenities.createdBy,
    allowNull: false,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: UnitSpecificAmenities.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: UnitSpecificAmenities.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: UnitSpecificAmenities.isDeleted,
    allowNull: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: UnitSpecificAmenities.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: UnitSpecificAmenities.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: UnitSpecificAmenities.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}