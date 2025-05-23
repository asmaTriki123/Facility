import { Table, Column, DataType, PrimaryKey, Model, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Facility } from "./Facility";

@Table({
  tableName: AccessHours.hoursTableName,
  timestamps: false,
})

export class AccessHours extends Model {
  public static hoursTableName = "AccessHours" as string;
  public static AccessHoursId = "AccessHoursId" as string;
  public static AccessHoursDay = "AccessHoursDay" as string;
  public static AccessHoursStartTime = "AccessHoursStartTime" as string;
  public static AccessHoursEndTime = "AccessHoursEndTime" as string;
  public static AccessHoursType = "AccessHoursType" as string;
  public static facilityId = "facilityId" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static AccessHoursClosing = "AccessHoursClosing" as string;
  public static AccessHoursApponentonly = "AccessHoursApponentonly" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static deletedAt = "deletedAt" as string;

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: AccessHours.AccessHoursId,
    allowNull: false,
  })
  AccessHoursId!: number;

  @ForeignKey(() => Facility)
  @Column({
    type: DataType.INTEGER,
    field: AccessHours.facilityId,
  })
  facilityId!: number;

  @BelongsTo(() => Facility)
  facility!: Facility;

  @Column({
    type: DataType.STRING,
    field: AccessHours.AccessHoursDay,
    allowNull: false,
  })

  AccessHoursDay!: string;


  @Column({
    type: DataType.TIME,
    field: AccessHours.AccessHoursStartTime,
    allowNull: true,
  })

  AccessHoursStartTime!: string;

  @Column({
    type: DataType.TIME,
    field: AccessHours.AccessHoursEndTime,
    allowNull: true,
  })

  AccessHoursEndTime!: string;

  @Column({
    type: DataType.STRING,
    field: AccessHours.AccessHoursType,
    allowNull: true,
  })

  AccessHoursType!: string;
  


    @Column({
    type: DataType.BOOLEAN,
    field: AccessHours.AccessHoursClosing,
    allowNull: true,
    defaultValue : false
  })

  AccessHoursClosing!: boolean;

    @Column({
    type: DataType.BOOLEAN,
    field: AccessHours.AccessHoursApponentonly,
    allowNull: true,
    defaultValue : false
  })

  AccessHoursApponentonly!: boolean;

  @Column({
    type: DataType.STRING,
    field: AccessHours.createdBy,
    allowNull: true,
  })
  createdBy!: string;


  @Column({
    type: DataType.STRING,
    field: AccessHours.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: AccessHours.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: AccessHours.isDeleted,
    allowNull: true,
    defaultValue: false
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: AccessHours.createdAt,
    allowNull: true,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: AccessHours.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: AccessHours.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;



}
