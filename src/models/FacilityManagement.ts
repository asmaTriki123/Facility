import { Model, Table, PrimaryKey, DataType, Column, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Facility } from "./Facility";
import { User } from "./User";
@Table({
  tableName: FacilityManagement.facilitymanagementTableName,
  timestamps: false,
})

export class FacilityManagement extends Model {
  public static facilitymanagementTableName = "facilitymanagement" as string;
  public static facilitymanagementId = "facilitymanagementId" as string;
  public static facilityId = "facilityId" as string;
  public static userId = "userId" as string;
  public static isInActive = "isInActive" as string;
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
    field: FacilityManagement.facilitymanagementId,
    allowNull: false,
  })

  facilitymanagementId!: number;
  @ForeignKey(() => Facility)
  @Column({
    type: DataType.INTEGER,
    field: FacilityManagement.facilityId,
  })
  facilityId!: number;

  @BelongsTo(() => Facility)
  facilities!: Facility;


  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    field: FacilityManagement.userId,
  })
  userId!: string;

  @BelongsTo(() => User)
  users!: User;
  @Column({
    type: DataType.STRING,
    field: FacilityManagement.isInActive,
    allowNull: true,
  })
  isInActive!: string;
  @Column({
    type: DataType.STRING,
    field: FacilityManagement.createdBy,
    allowNull: true,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: FacilityManagement.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: FacilityManagement.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: FacilityManagement.isDeleted,
    allowNull: true,

  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: FacilityManagement.createdAt,
    allowNull: true,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: FacilityManagement.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: FacilityManagement.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
 
}