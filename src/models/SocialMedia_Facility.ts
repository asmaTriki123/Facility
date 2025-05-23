import { Table, Column, DataType, PrimaryKey, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { Facility } from "./Facility";
import { SocialMedia } from "./SocialMedia";

@Table({
  tableName: SocialMediaFacility.SocialMediaFacilityTableName,
  timestamps: false,
})
export class SocialMediaFacility extends Model {
  public static SocialMediaFacilityTableName = "SocialMediaFacility" as string;
  public static socialMediaId = "socialMediaId" as string;
  public static facilityId = "facilityId" as string;
  public static SocialMediaFacilityURL = "SocialMediaFacilityURL" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static deletedAt = "deletedAt" as string;

  @PrimaryKey
  @ForeignKey(() => Facility)
  @Column({
    type: DataType.INTEGER,
    field: SocialMediaFacility.facilityId,
    allowNull: false,
  })
  facilityId!: number;
  @BelongsTo(() => Facility)
  facility!: Facility;

  @PrimaryKey
  @ForeignKey(() => SocialMedia)
  @Column({
    type: DataType.INTEGER,
    field: SocialMediaFacility.socialMediaId,
    allowNull: false,
  })
  socialMediaId!: number;
  
  @BelongsTo(() => SocialMedia)
  socialmedia!: SocialMedia;


    @Column({
    type: DataType.STRING,
    field: SocialMediaFacility.SocialMediaFacilityURL,
    allowNull: false,
  })
  SocialMediaFacilityURL!: string;

  @Column({
    type: DataType.INTEGER,
    field: SocialMediaFacility.createdBy,
    allowNull: false,
  })
  createdBy!: number;
  @Column({
    type: DataType.INTEGER,
    field: SocialMediaFacility.updatedBy,
    allowNull: true,
  })
  updatedBy!: number;

  @Column({
    type: DataType.INTEGER,
    field: SocialMediaFacility.deletedBy,
    allowNull: true,
  })
  deletedBy!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: SocialMediaFacility.isDeleted,
    allowNull: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: SocialMediaFacility.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: SocialMediaFacility.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: SocialMediaFacility.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}
