import { Model, Table, PrimaryKey, DataType, Column, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Facility } from "./Facility";
import { AmenitiesFacility } from "./AmenitiesFacility";
@Table({
  tableName: Amenities.amenitiesTableName,
  timestamps: false,
})

export class Amenities extends Model {
  public static amenitiesTableName = "amenities" as string;
  public static amenitiesId = "amenitiesId" as string
  public static amenitiesSection = "amenitiesSection" as string
  public static amenitiesOptionName = "amenitiesOptionName" as string
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
    field: Amenities.amenitiesId,
    allowNull: false,
  })
  amenitiesId!: number;
  @HasMany(() => AmenitiesFacility)
  amenitiesfacility!: AmenitiesFacility[];

  @Column({
    type: DataType.STRING (30),
    field: Amenities.amenitiesSection,
    allowNull: false,
  })
  amenitiesSection!: number;

  @Column({
    type: DataType.STRING (30),
    field: Amenities.amenitiesOptionName,
    allowNull: false,
  })
  amenitiesOptionName!: string;

  @Column({
    type: DataType.STRING,
    field: Amenities.createdBy,
    allowNull: false,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: Amenities.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: Amenities.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Amenities.isDeleted,
    allowNull: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Amenities.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Amenities.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Amenities.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}