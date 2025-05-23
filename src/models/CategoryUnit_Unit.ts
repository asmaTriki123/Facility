import { Table, Column, DataType, PrimaryKey, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { CategoryUnit } from "./CategoryUnit";
import { Unit } from "./Unit";

@Table({
  tableName: CategoryUnitUnit.CategoryUnitUnitTableName,
  timestamps: false,
})
export class CategoryUnitUnit extends Model {
  public static CategoryUnitUnitTableName = "CategoryUnitUnit" as string;
  public static unitId = "unitId" as string;
  public static categoryUnitId = "categoryUnitId" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static deletedAt = "deletedAt" as string;
  @PrimaryKey
  @ForeignKey(() => CategoryUnit)
  @Column({
    type: DataType.INTEGER,
    field: CategoryUnitUnit.categoryUnitId,
    allowNull: false,
  })
  categoryUnitId!: number;
  @BelongsTo(() => CategoryUnit)
  categoryunit!: CategoryUnit;

  @PrimaryKey
  @ForeignKey(() => Unit)
  @Column({
    type: DataType.INTEGER,
    field: CategoryUnitUnit.unitId,
    allowNull: false,
  })
  unitId!: number;
  @BelongsTo(() => Unit)
  unit!: Unit;

  @Column({
    type: DataType.STRING,
    field: CategoryUnitUnit.createdBy,
    allowNull: false,
  })
  createdBy!: string;
  @Column({
    type: DataType.INTEGER,
    field: CategoryUnitUnit.updatedBy,
    allowNull: true,
  })
  updatedBy!: number;

  @Column({
    type: DataType.INTEGER,
    field: CategoryUnitUnit.deletedBy,
    allowNull: true,
  })
  deletedBy!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: CategoryUnitUnit.isDeleted,
    allowNull: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: CategoryUnitUnit.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: CategoryUnitUnit.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: CategoryUnitUnit.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}
