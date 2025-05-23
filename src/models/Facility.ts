import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, HasMany, BelongsToMany } from "sequelize-typescript";
import { Amenities } from "./Amenities";
import { Coordinate } from "./Coordinate";
import { PhotosFacility } from "./PhotosFacility";
import { Unit } from "./Unit";
import { Hours } from "./Hours";
import { Holidays } from "./Holidays";
import { FacilityManagement } from "./FacilityManagement";
import { AmenitiesFacility } from "./AmenitiesFacility";
import { HolidaysFacility } from "./HolidaysFacility";
import { SocialMedia } from "./SocialMedia";
import { SocialMediaFacility } from "./SocialMedia_Facility";
import { AccessHours } from "./AccessHours";

@Table({
  tableName: Facility.facilityTableName,
  timestamps: false,
})
export class Facility extends Model {
  public static facilityTableName = "facility" as string;
  public static facilityId = "facilityId" as string;
  public static facilityName = "facilityName" as string;
  public static facilityUrl = "facilityUrl" as string;
  public static facilityAdminFee = "facilityAdminFee" as string;
  public static facilityPhoneNumber = "facilityPhoneNumber" as string;
  public static facilityCellPhoneNumber = "facilityCellPhoneNumber" as string;
  public static facilityAddress = "facilityAddress" as string;
  public static facilityDescription = "facilityDescription" as string;
  public static facilityTimezone = "facilityTimezone" as string;
  public static facilityType = "facilityType" as string;
  public static country = "country" as string;
  public static facilityGoogleMapslink = "facilityGoogleMapslink" as string;
  public static facilityLongitude = "facilityLongitude" as string;
  public static facilityLatitude = "facilityLatitude" as string;
  public static facilityAdditionalNote = "facilityAdditionalNote" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static deletedAt = "deletedAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static createdAt = "createdAt" as string;

  // Define attributes of the Parking table

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: Facility.facilityId,
    allowNull: false,
  })
  facilityId!: number;
  @HasMany(() => FacilityManagement)
  facilityManagement!: FacilityManagement[];

  @HasMany(() => Coordinate)
  coordinate!: Coordinate[];

  @HasMany(() => PhotosFacility)
  photosFacility!: PhotosFacility[];

  @HasMany(() => Unit)
  unit!: Unit[];

  @HasMany(() => Hours)
  hours!: Hours[];

  @HasMany(() => AccessHours)
  AccessHours!: AccessHours[];

  @HasMany(() => AmenitiesFacility)
  amenitiesfacility!: AmenitiesFacility[];

  @HasMany(() => HolidaysFacility)
  holidaysfacility!: HolidaysFacility[];

  @BelongsToMany(() => SocialMedia, () => SocialMediaFacility)
  socialMedias!: SocialMedia[];

  @Column({
    type: DataType.STRING,
    field: Facility.facilityName,
    allowNull: false,
  })
  facilityName!: string;

 
  @Column({
    type: DataType.STRING,
    field: Facility.facilityUrl,
    allowNull: true,
  })
  facilityUrl!: string;

  @Column({
    type: DataType.STRING,
    field: Facility.facilityPhoneNumber,
    allowNull: true,
  })
  facilityPhoneNumber!: string;

  @Column({
    type: DataType.STRING,
    field: Facility.facilityCellPhoneNumber,
    allowNull: false,
  })
  facilityCellPhoneNumber!: string;

  @Column({
    type: DataType.STRING,
    field: Facility.facilityAddress,
    allowNull: false,
  })
  facilityAddress!: string;

  @Column({
    type: DataType.TEXT,
    field: Facility.facilityDescription,
    allowNull: false,
  })
  facilityDescription!: string;



  

  @Column({
    type: DataType.STRING,
    field: Facility.facilityGoogleMapslink,
    allowNull: true,
  })
  facilityGoogleMapslink!: string;

  @Column({
    type: DataType.FLOAT,
    field: Facility.facilityLongitude,
    allowNull: true,
  })
  facilityLongitude!: number;

  @Column({
    type: DataType.STRING,
    field: Facility.country,
    allowNull: true,
  })
  country!: string;
  @Column({
    type: DataType.FLOAT,
    field: Facility.facilityLatitude,
    allowNull: true,
  })
  facilityLatitude!: number;

  @Column({
    type: DataType.STRING,
    field: Facility.facilityAdditionalNote,
    allowNull: true,
  })
  facilityAdditionalNote!: string;

  @Column({
    type: DataType.STRING,
    field: Facility.facilityTimezone,
    allowNull: true,
  })
  facilityTimezone!: string;

  @Column({
    type: DataType.STRING,
    field: Facility.facilityType,
    allowNull: false,
  })
  facilityType!: string;

  @Column({
    type: DataType.STRING,
    field: Facility.createdBy,
    allowNull: false,
  })
  createdBy!: string;


  @Column({
    type: DataType.STRING,
    field: Facility.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: Facility.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Facility.isDeleted,
    allowNull: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Facility.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Facility.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Facility.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
  @Column({
    type: DataType.INTEGER,
    field: Facility.facilityAdminFee,
    allowNull: true,
  })
  facilityAdminFee!: number;



}
