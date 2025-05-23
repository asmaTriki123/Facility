import { Model, ForeignKey, PrimaryKey, Table, Column, AutoIncrement, AllowNull, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Facility } from "./Facility";
import { SocialMediaFacility } from "./SocialMedia_Facility";
//import { SocialMediaFacility } from "./SocialMedia_facility";

@Table({
  tableName: SocialMedia.SocialMediaTableName,
  timestamps: false,
})

export class SocialMedia extends Model {
  public static SocialMediaTableName = "SocialMedia" as string;
  public static socialMediaId = "socialMediaId" as string;
  public static socialMediaName = "socialMediaName" as string;
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
    field: SocialMedia.socialMediaId,
    allowNull: false
  })
  socialMediaId!: number;


  @BelongsToMany(() => Facility, () => SocialMediaFacility)
  facilities!: Facility[];

  @Column({
    type: DataType.STRING,
    field: SocialMedia.socialMediaName,
    allowNull: false
  })
  socialMediaName!: string;
  @Column({
    type: DataType.STRING,
    field: SocialMedia.createdBy,
    allowNull: true,
  })
  createdBy!: string;


  @Column({
    type: DataType.STRING,
    field: SocialMedia.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: SocialMedia.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: SocialMedia.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: SocialMedia.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: SocialMedia.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: SocialMedia.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}

