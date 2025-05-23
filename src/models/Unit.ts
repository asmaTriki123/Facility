import { Model, Table, PrimaryKey, DataType, Column, AutoIncrement, ForeignKey, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";
import { TypeUnit } from "./TypeUnit";
import { Facility } from "./Facility";
import { PhotoUnit } from "./PhotoUnit";
import { Rent } from "./Rent";
import { CategoryUnit } from "./CategoryUnit";
import { CategoryUnitUnit } from "./CategoryUnit_Unit";
import { AmenitiesUnit } from "./AmenitiesUnit";
@Table({
  tableName: Unit.unitTableName,
  timestamps: false,
})

export class Unit extends Model {
  public static unitTableName = "unit" as string;
  public static unitId = "unitId" as string;
  public static unitName = "unitName" as string;
  public static unitStatus = "unitStatus" as string;
  public static unitNotes = "unitNotes" as string;
  public static typeUnitId = "typeUnitId" as string;
  public static facilityId = "facilityId" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static deletedAt = "deletedAt" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static categoryUnitId = "categoryUnitId" as string;

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: Unit.unitId,
    allowNull: false,
  })
  unitId!: number;
  @ForeignKey(() => TypeUnit)
  @Column({
    type: DataType.INTEGER,
    field: Unit.typeUnitId,
  })
  typeUnitId!: number;

  @BelongsTo(() => TypeUnit)
  typeUnit!: TypeUnit;

  @ForeignKey(() => Facility)
  @Column({
    type: DataType.INTEGER,
    field: Unit.facilityId,
     allowNull: false,
  })
  facilityId!: number;

  @BelongsTo(() => Facility)
  facility!: Facility;

  @HasMany(() => PhotoUnit)
  photoUnit!: PhotoUnit[];

  @HasMany(() => CategoryUnitUnit)
  categoryUnitUnits!: CategoryUnitUnit[];

  // Relation indirecte vers CategoryUnit via la table associative
  @BelongsToMany(() => CategoryUnit, () => CategoryUnitUnit)
  categoryUnits!: CategoryUnit[];

  @HasMany(() => AmenitiesUnit)
    amenitiesUnit!: AmenitiesUnit[];

  @Column({
    type: DataType.STRING,
    field: Unit.unitName,
    allowNull: false,
  })

  unitName!: string;

  @Column({
    type: DataType.STRING,
    field: Unit.unitStatus,
    allowNull: false,
  })

  unitStatus!: string;

  @Column({
    type: DataType.STRING,
    field: Unit.unitNotes,
    allowNull: true,
  })
  unitNotes!: string;
  @Column({
    type: DataType.STRING,
    field: Unit.createdBy,
    allowNull: true,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: Unit.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: Unit.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Unit.isDeleted,
    allowNull: true,

  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Unit.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Unit.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Unit.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;

  @HasMany(() => Rent)
  rent!: Rent[];

}