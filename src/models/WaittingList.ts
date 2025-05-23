import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, AllowNull, PrimaryKey, Unique } from "sequelize-typescript";
import { Role } from "./Role";
import { Company } from "./Company";
import { Rent } from "./Rent";
import { FacilityManagement } from "./FacilityManagement";
import { TypeUnit } from "./TypeUnit";

@Table({
  tableName: WaittingList.userTableName,
  timestamps: false,
})
export class WaittingList extends Model {
  public static userTableName = "WaittingList" as string;
  public static WaittingListId = "WaittingListId" as string;
  public static roleId = "roleId" as string;
  public static userFirstName = "userFirstName" as string;
  public static userLastName = "userLastName" as string;
  public static userEmail = "userEmail" as string;
  public static userEmailInfo = "userEmailInfo" as string;
  public static userAdress1 = "userAdress1" as string;
  public static userAdress2 = "userAdress2" as string;
  public static userPassword = "userPassword" as string;
  public static userCellPhone = "userCellPhone" as string;
  public static userPhoneNumber = "userPhoneNumber" as string;
  public static userPostalCode = "userPostalCode" as string;
  public static userDriverLicense = "userDriverLicense" as string;
  public static userDriverUrl = "userDriverUrl" as string;
  public static userIsActive = "userIsActive" as string;
  public static userSmsOptIn = "userSmsOptIn" as string;
  public static userNewsletterOptIn = "userNewsletterOptIn" as string;
  public static userIsVerified = "userIsVerified" as string;
  public static userPhoto = "userPhoto" as string;
  public static userNotes = "userNotes" as string;
  public static userCountry = "userCountry" as string;
  public static userGender = "userGender" as string;
  public static userCity = "userCity" as string;
  public static userState = "userState" as string;
  public static LastLogin = "LastLogin" as string;
  public static facilityId = "facilityId" as string;
  public static userType = "userType" as string;
  public static typeUnitId = "typeUnitId" as string;
  public static rentMoveIn = "rentMoveIn" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static deletedAt = "deletedAt" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;

  @PrimaryKey
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    field: WaittingList.WaittingListId,
  })
  WaittingListId!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    field: WaittingList.roleId,
    allowNull: true,
  })
  roleId!: number;
  @ForeignKey(() => TypeUnit)
  @Column({
    type: DataType.INTEGER,
    field: WaittingList.typeUnitId,
  })
  typeUnitId!: number;

  @BelongsTo(() => Role)
  role!: Role;
 
  @Column({ type: DataType.STRING(40), field: WaittingList.userFirstName, allowNull: false })
  userFirstName!: string;
  @Column({ type: DataType.STRING(40), field: WaittingList.facilityId, allowNull: false })
  facilityId!: string;
  @Column({ type: DataType.STRING(40), field: WaittingList.userLastName, allowNull: false })
  userLastName!: string;

  @Column({ type: DataType.STRING(80), field: WaittingList.userEmail, allowNull: false })
  userEmail!: string;

  @Column({ type: DataType.STRING(80), field: WaittingList.userEmailInfo, allowNull: true })
  userEmailInfo!: string;

  @Column({ type: DataType.STRING(255), field: WaittingList.userAdress1, allowNull: true })
  userAdress1!: string;

  @Column({ type: DataType.STRING(255), field: WaittingList.userAdress2, allowNull: true })
  userAdress2!: string;

  @Column({ type: DataType.STRING(110), field: WaittingList.userPassword, allowNull: true })
  userPassword!: string;

  @Column({ type: DataType.STRING(15), field: WaittingList.userCellPhone, allowNull: false })
  userCellPhone!: string;

  @Column({ type: DataType.STRING(15), field: WaittingList.userPhoneNumber, allowNull: true })
  userPhoneNumber!: string;

  @Column({ type: DataType.STRING(12), field: WaittingList.userGender, allowNull: false })
  userGender!: string;

  @Column({ type: DataType.STRING(12), field: WaittingList.userType, allowNull: true })
  userType!: string;

  @Column({ type: DataType.STRING(10), field: WaittingList.userPostalCode, allowNull: true })
  userPostalCode!: string;

  @Column({ type: DataType.STRING(50), field: WaittingList.userDriverLicense, allowNull: true })
  userDriverLicense!: string;

  @Column({ type: DataType.STRING(255), field: WaittingList.userDriverUrl, allowNull: true, defaultValue: '/uploads/driverlicence.PNG' })
  userDriverUrl!: string | null;

  @Column({
    type: DataType.STRING(255),
    field: WaittingList.userPhoto,
    allowNull: true,
    defaultValue: '/uploads/user2.PNG'
  })
  userPhoto!: string | null;

  @Column({ type: DataType.TEXT, field: WaittingList.userNotes, allowNull: true })
  userNotes!: string;

  @Column({ type: DataType.STRING(30), field: WaittingList.userCountry, allowNull: false })
  userCountry!: string;

  @Column({ type: DataType.STRING(50), field: WaittingList.userCity, allowNull: true })
  userCity!: string;

  @Column({ type: DataType.STRING(50), field: WaittingList.userState, allowNull: true })
  userState!: string;



  @Column({ type: DataType.BOOLEAN, field: WaittingList.userIsActive, allowNull: true, defaultValue: true })
  userIsActive!: boolean;

  @Column({ type: DataType.BOOLEAN, field: WaittingList.userSmsOptIn, allowNull: true })
  userSmsOptIn!: boolean;

  @Column({ type: DataType.BOOLEAN, field: WaittingList.userNewsletterOptIn, allowNull: true })
  userNewsletterOptIn!: boolean;

  @Column({ type: DataType.BOOLEAN, field: WaittingList.userIsVerified, allowNull: true })
  userIsVerified!: boolean;



  @Column({ type: DataType.DATE, field: WaittingList.LastLogin, allowNull: true })
  LastLogin!: Date;

  @Column({ type: DataType.BOOLEAN, field: WaittingList.isDeleted, allowNull: false })
  isDeleted!: boolean;

  @Column({ type: DataType.STRING, field: WaittingList.createdBy, allowNull: true })
  createdBy!: string;

  @Column({ type: DataType.STRING, field: WaittingList.updatedBy, allowNull: true })
  updatedBy!: string;

  @Column({ type: DataType.STRING, field: WaittingList.deletedBy, allowNull: true })
  deletedBy!: string;

  @Column({ type: DataType.DATE, field: WaittingList.createdAt, allowNull: false, })
  createdAt!: Date;

  @Column({ type: DataType.DATE, field: WaittingList.updatedAt, allowNull: true })
  updatedAt!: Date;

  @Column({ type: DataType.DATE, field: WaittingList.deletedAt, allowNull: true })
  deletedAt!: Date;
   @Column({
    type: DataType.DATE,
    field: WaittingList.rentMoveIn,
    allowNull: false, // Cette colonne est obligatoire (non NULL)
  })
  rentMoveIn!: Date;


}
