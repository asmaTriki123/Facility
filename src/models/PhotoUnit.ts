import { Column, Table, PrimaryKey, DataType, Model, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Unit } from "./Unit";


@Table({
  tableName: PhotoUnit.photoUnitTableName,
  timestamps: false,
})

export class PhotoUnit extends Model {
  public static photoUnitTableName = "photoUnit" as string;
  public static photoUnitId = "photoUnitId" as string;
  public static photoUnitName = "photoUnitName" as string;
  public static photoUnitType = "photoUnitType" as string;
  public static unitId = "unitId" as string;
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
    field: PhotoUnit.photoUnitId,
    allowNull: false
  })
  photoUnitId!: number;
  @ForeignKey(() => Unit)
  @Column({
    type: DataType.INTEGER,
    field: PhotoUnit.unitId,
  })
  unitId!: number;

  @BelongsTo(() => Unit)
  unit!: Unit;

  @Column({
    type: DataType.STRING,
    field: PhotoUnit.photoUnitName,
    allowNull: true,
  })
  photoUnitName!:string | null;;
  @Column({
    type: DataType.STRING,
    field: PhotoUnit.createdBy,
    allowNull: true,
  })
  createdBy!: string;

   @Column({
    type: DataType.STRING,
    field: PhotoUnit.photoUnitType,
    allowNull: true,
  })
  photoUnitType!: string;
  @Column({
    type: DataType.STRING,
    field: PhotoUnit.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: PhotoUnit.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: PhotoUnit.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: PhotoUnit.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PhotoUnit.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PhotoUnit.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}  
