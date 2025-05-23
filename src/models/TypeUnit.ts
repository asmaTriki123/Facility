import { Model, Table, PrimaryKey, DataType, Column, AutoIncrement, HasMany } from "sequelize-typescript";
import { Unit } from "./Unit";
import { WaittingList } from "./WaittingList";
@Table({
  tableName: TypeUnit.typeUnitTableName,
  timestamps: false,
})

export class TypeUnit extends Model {
  public static typeUnitTableName = "typeUnit" as string;
  public static typeUnitId = "typeUnitId" as string
  public static typeUnitLength = "typeUnitLength" as string
  public static typeUnitWidth = "typeUnitWidth" as string
  public static typeUnitHeight = "typeUnitHeight" as string
  public static typeUnitName = "typeUnitName" as string
  public static typeUnitDescription = "typeUnitDescription" as string
  public static typeUnitPriceDaily = "typeUnitPriceDaily" as string
  public static typeUnitPriceMonthly = "typeUnitPriceMonthly" as string
  public static typeUnitPhoto = "typeUnitPhoto" as string
  public static createdByCompany = "createdByCompany" as string;
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
    field: TypeUnit.typeUnitId,
    allowNull: false,
  })
  typeUnitId!: number;

  @HasMany(() => Unit)
  unit!: Unit[];

   @HasMany(() => WaittingList)
  waittingList!: WaittingList[];
  @Column({
    type: DataType.FLOAT,
    field: TypeUnit.typeUnitLength,
    allowNull: false,
  })
  typeUnitLength!: number;

  @Column({
    type: DataType.FLOAT,
    field: TypeUnit.typeUnitWidth,
    allowNull: false,
  })
  typeUnitWidth!: number;

  @Column({
    type: DataType.FLOAT,
    field: TypeUnit.typeUnitHeight,
    allowNull: true,
    defaultValue: 0,  

  })
  typeUnitHeight!: number;

  @Column({
    type: DataType.STRING,
    field: TypeUnit.typeUnitName,
    allowNull: false,
  })
  typeUnitName!: string;

  @Column({
    type: DataType.STRING,
    field: TypeUnit.typeUnitDescription,
    allowNull: false,
  })
  typeUnitDescription!: string;

  
  @Column({
    type: DataType.FLOAT,
    field: TypeUnit.typeUnitPriceMonthly,
    allowNull: false,
  })
  typeUnitPriceMonthly!: number;
  @Column({
    type: DataType.FLOAT,
    field: TypeUnit.typeUnitPriceDaily,
    allowNull: false,
  })
  typeUnitPriceDaily!: number;


  @Column({
    type: DataType.STRING,
    field: TypeUnit.typeUnitPhoto,
    allowNull: true,
    defaultValue: '/uploads/TypeUnit.png' 
  })
  typeUnitPhoto!: string | null;
  @Column({
    type: DataType.STRING,
    field: TypeUnit.createdBy,
    allowNull: true,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: TypeUnit.createdByCompany,
    allowNull: true,
  })
  createdByCompany!: string;

  @Column({
    type: DataType.STRING,
    field: TypeUnit.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: TypeUnit.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: TypeUnit.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: TypeUnit.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: TypeUnit.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: TypeUnit.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}