import { Table, Column, DataType, PrimaryKey, Model, AutoIncrement, ForeignKey, HasMany, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Unit } from "./Unit";
import { CategoryUnitUnit } from "./CategoryUnit_Unit";

@Table({
  tableName: CategoryUnit.categoryUnitTableName,
  timestamps: false,
})

export class CategoryUnit extends Model {

  public static categoryUnitTableName = "categoryUnit" as string;
  public static categoryUnitId = "categoryUnitId" as string;
  public static categoryUnitName = "categoryUnitName" as string;
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
    field: CategoryUnit.categoryUnitId,
    allowNull: false,
  })
  categoryUnitId!: number;

  @HasMany(() => CategoryUnitUnit)
  categoryUnitUnits!: CategoryUnitUnit[];


  @BelongsToMany(() => Unit, () => CategoryUnitUnit)
  units!: Unit[];

  @Column({
    type: DataType.STRING,
    field: CategoryUnit.categoryUnitName,
    allowNull: false,
  })
  categoryUnitName!: string;
  @Column({
    type: DataType.STRING,
    field: CategoryUnit.createdBy,
    allowNull: false,
  })
  createdBy!: string;
  @Column({
    type: DataType.INTEGER,
    field: CategoryUnit.updatedBy,
    allowNull: true,
  })
  updatedBy!: number;

  @Column({
    type: DataType.INTEGER,
    field: CategoryUnit.deletedBy,
    allowNull: true,
  })
  deletedBy!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: CategoryUnit.isDeleted,
    allowNull: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: CategoryUnit.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: CategoryUnit.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: CategoryUnit.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}