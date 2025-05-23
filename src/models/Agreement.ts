import { Model, Table, PrimaryKey, DataType, Column, AutoIncrement } from "sequelize-typescript";
@Table({
  tableName: Agreement.agreementTableName,
  timestamps: false,
})


export class Agreement extends Model {
  public static agreementTableName = "Agreement" as string;
  public static AgreementId = "AgreementId" as string;
  public static AgreementTitle = "AgreementTitle" as string;
   public static AgreementBody = "AgreementBody" as string;
   public static companyId = "companyId" as string;
   public static pdfPath = "pdfPath" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  public static deletedAt = "deletedAt" as string;

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: Agreement.AgreementId,
    allowNull: false,
  })
  AgreementId!: number;

  
   @Column({
    type: DataType.INTEGER,
    field: Agreement.companyId,
    allowNull: false,
  })
  companyId!: number;
     @Column({
    type: DataType.STRING,
    field: Agreement.AgreementTitle,
    allowNull: true,
  })
  AgreementTitle!: string;

    @Column({
    type: DataType.TEXT,
    field: Agreement.AgreementBody,
    allowNull: true,
  })
  AgreementBody!: string;
  
   @Column({
    type: DataType.STRING,
    field: Agreement.createdBy,
    allowNull: true,
  })
  createdBy!: string;
 @Column({
    type: DataType.STRING,
    field: Agreement.pdfPath,
    allowNull: true,
  })
  pdfPath!: string;

  @Column({
    type: DataType.STRING,
    field: Agreement.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;

  @Column({
    type: DataType.STRING,
    field: Agreement.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Agreement.isDeleted,
    allowNull: true,
    defaultValue: false
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Agreement.createdAt,
    allowNull: true,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Agreement.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Agreement.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;
}
