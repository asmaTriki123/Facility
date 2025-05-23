import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, AllowNull, PrimaryKey, Unique } from "sequelize-typescript";
import { Role } from "./Role";
import { Company } from "./Company";
import { Rent } from "./Rent";
import { FacilityManagement } from "./FacilityManagement";

@Table({
  tableName: User.userTableName,
  timestamps: false,
})
export class User extends Model {
  public static userTableName = "user" as string;
  public static userId = "userId" as string;
  public static roleId = "roleId" as string;
  public static companyId = "companyId" as string;
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
  public static userType = "userType" as string;
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
    field: User.userId,
  })
  userId!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    field: User.roleId,
    allowNull: true,
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    field: User.companyId,

  })
  companyId!: number;

  @BelongsTo(() => Company)
  company!: Company;
  @HasMany(() => Rent)
  rent!: Rent[];

  @HasMany(() => FacilityManagement)
  facilitymanagement!: FacilityManagement[];

  @Column({ type: DataType.STRING, field: User.userFirstName, allowNull: false })
  userFirstName!: string;

  @Column({ type: DataType.STRING, field: User.userLastName, allowNull: false })
  userLastName!: string;

  @Column({ type: DataType.STRING, field: User.userEmail, allowNull: false })
  userEmail!: string;

  @Column({ type: DataType.STRING, field: User.userEmailInfo, allowNull: true })
  userEmailInfo!: string;

  @Column({ type: DataType.STRING, field: User.userAdress1, allowNull: true })
  userAdress1!: string;

  @Column({ type: DataType.STRING, field: User.userAdress2, allowNull: true })
  userAdress2!: string;

  @Column({ type: DataType.STRING, field: User.userPassword, allowNull: true })
  userPassword!: string;

  @Column({ type: DataType.STRING, field: User.userCellPhone, allowNull: false })
  userCellPhone!: string;

  @Column({ type: DataType.STRING, field: User.userPhoneNumber, allowNull: true })
  userPhoneNumber!: string;

  @Column({ type: DataType.STRING, field: User.userGender, allowNull: false })
  userGender!: string;

  @Column({ type: DataType.STRING, field: User.userType, allowNull: true })
  userType!: string;

  @Column({ type: DataType.STRING, field: User.userPostalCode, allowNull: true })
  userPostalCode!: string;

  @Column({ type: DataType.STRING, field: User.userDriverLicense, allowNull: true })
  userDriverLicense!: string;

  @Column({ type: DataType.STRING, field: User.userDriverUrl, allowNull: true, defaultValue: '/uploads/driverlicence.PNG' })
  userDriverUrl!: string | null;

  @Column({
    type: DataType.STRING,
    field: User.userPhoto,
    allowNull: true,
    defaultValue: '/uploads/user2.PNG'
  })
  userPhoto!: string | null;

  @Column({ type: DataType.TEXT, field: User.userNotes, allowNull: true })
  userNotes!: string;

  @Column({ type: DataType.STRING, field: User.userCountry, allowNull: false })
  userCountry!: string;

  @Column({ type: DataType.STRING, field: User.userCity, allowNull: true })
  userCity!: string;

  @Column({ type: DataType.STRING, field: User.userState, allowNull: true })
  userState!: string;



  @Column({ type: DataType.BOOLEAN, field: User.userIsActive, allowNull: true, defaultValue: true })
  userIsActive!: boolean;

  @Column({ type: DataType.BOOLEAN, field: User.userSmsOptIn, allowNull: true })
  userSmsOptIn!: boolean;

  @Column({ type: DataType.BOOLEAN, field: User.userNewsletterOptIn, allowNull: true })
  userNewsletterOptIn!: boolean;

  @Column({ type: DataType.BOOLEAN, field: User.userIsVerified, allowNull: true })
  userIsVerified!: boolean;



  @Column({ type: DataType.DATE, field: User.LastLogin, allowNull: true })
  LastLogin!: Date;

  @Column({ type: DataType.BOOLEAN, field: User.isDeleted, allowNull: false })
  isDeleted!: boolean;

  @Column({ type: DataType.STRING, field: User.createdBy, allowNull: true })
  createdBy!: string;

  @Column({ type: DataType.STRING, field: User.updatedBy, allowNull: true })
  updatedBy!: string;

  @Column({ type: DataType.STRING, field: User.deletedBy, allowNull: true })
  deletedBy!: string;

  @Column({ type: DataType.DATE, field: User.createdAt, allowNull: false, })
  createdAt!: Date;

  @Column({ type: DataType.DATE, field: User.updatedAt, allowNull: true })
  updatedAt!: Date;

  
  @Column({ type: DataType.DATE, field: User.deletedAt, allowNull: true })
  deletedAt!: Date;

}
