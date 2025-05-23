import { Table, Column, DataType, PrimaryKey, Model, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Facility } from "./Facility";
import { HolidaysFacility } from "./HolidaysFacility";

@Table({
  tableName: Holidays.holidaysTableName,
  timestamps: false,
})

export class Holidays extends Model {
  public static holidaysTableName = "holidays" as string;
  public static holidaysId = "holidaysId" as string;
  public static holidaysName = "holidaysName" as string;
  public static holidaysCountry = "holidaysCountry" as string;
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
    field: Holidays.holidaysId,
    allowNull: false,
  })
  holidaysId!: number;
  @HasMany(() => HolidaysFacility)
  holidaysfacility!: HolidaysFacility[];
  @Column({
    type: DataType.STRING,
    field: Holidays.holidaysName,
    allowNull: false,
  })
  holidaysName!: string;

  @Column({
    type: DataType.STRING,
    field: Holidays.holidaysCountry,
    allowNull: false,
  })

  holidaysCountry!: string;
  @Column({
    type: DataType.STRING,
    field: Holidays.createdBy,
    allowNull: true,
  })
  createdBy!: string;

  @Column({
    type: DataType.STRING,
    field: Holidays.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: Holidays.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Holidays.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Holidays.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Holidays.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Holidays.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;


}
