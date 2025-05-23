import { Column, Table, PrimaryKey, DataType, Model, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Facility } from "./Facility";

@Table({
  tableName: PhotosFacility.photosTableName,
  timestamps: false,
})

export class PhotosFacility extends Model {
  public static photosTableName = "photosfacility" as string;
  public static photosfacilityId = "photosfacilityId" as string;
  public static photosfacilityName = "photosfacilityName" as string;
  public static photosfacilityType = "photosfacilityType" as string;
  public static facilityId = "facilityId" as string;
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
    field: PhotosFacility.photosfacilityId,
    allowNull: false
  })

  photosfacilityId!: number;

  @ForeignKey(() => Facility)
  @Column({
    type: DataType.INTEGER,
    field: PhotosFacility.facilityId,
  })
  facilityId!: number;

  @BelongsTo(() => Facility)
  facility!: Facility;

  @Column({
    type: DataType.STRING,
    field: PhotosFacility.photosfacilityName,
    allowNull: false,
  })
  photosfacilityName!: string | null;

  @Column({
    type: DataType.STRING,
    field: PhotosFacility.photosfacilityType,
    allowNull: false,
  })
  photosfacilityType!: string;
  @Column({
    type: DataType.STRING,
    field: PhotosFacility.createdBy,
    allowNull: false,
  })
  createdBy!: string;


  @Column({
    type: DataType.STRING,
    field: PhotosFacility.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: PhotosFacility.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: PhotosFacility.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: PhotosFacility.createdAt,
    allowNull: true,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PhotosFacility.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PhotosFacility.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}  
