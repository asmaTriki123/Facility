import { Table, Column, DataType, PrimaryKey, Model, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Facility } from "./Facility";

@Table({
  tableName: Hours.hoursTableName,
  timestamps: false,
})

export class Hours extends Model {
  public static hoursTableName = "hours" as string;
  public static hoursId = "hoursId" as string;
  public static hoursDay = "hoursDay" as string;
  public static hoursStartTime = "hoursStartTime" as string;
  public static hoursEndTime = "hoursEndTime" as string;
  public static hoursType = "hoursType" as string;
  public static facilityId = "facilityId" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static hoursClosing = "hoursClosing" as string;
  public static hoursApponentonly = "hoursApponentonly" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static deletedAt = "deletedAt" as string;

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: Hours.hoursId,
    allowNull: false,
  })
  hoursId!: number;

  @ForeignKey(() => Facility)
  @Column({
    type: DataType.INTEGER,
    field: Hours.facilityId,
  })
  facilityId!: number;

  @BelongsTo(() => Facility)
  facility!: Facility;

  @Column({
    type: DataType.STRING,
    field: Hours.hoursDay,
    allowNull: true,
  })

  hoursDay!: string;


  @Column({
    type: DataType.TIME,
    field: Hours.hoursStartTime,
    allowNull: true,
  })

  hoursStartTime!: string;

  @Column({
    type: DataType.TIME,
    field: Hours.hoursEndTime,
    allowNull: true,
  })

  hoursEndTime!: string;

  @Column({
    type: DataType.STRING,
    field: Hours.hoursType,
    allowNull: true,
  })

  hoursType!: string;
  


    @Column({
    type: DataType.BOOLEAN,
    field: Hours.hoursClosing,
    allowNull: true,
    defaultValue : false
  })

  hoursClosing!: boolean;
    @Column({
    type: DataType.BOOLEAN,
    field: Hours.hoursApponentonly,
    allowNull: true,
    defaultValue : false
  })

  hoursApponentonly!: boolean;

  @Column({
    type: DataType.STRING,
    field: Hours.createdBy,
    allowNull: true,
  })
  createdBy!: string;


  @Column({
    type: DataType.STRING,
    field: Hours.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: Hours.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Hours.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Hours.createdAt,
    allowNull: true,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Hours.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Hours.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;



}
