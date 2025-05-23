import { Model, Table, Column, DataType, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, Unique, HasMany } from "sequelize-typescript";
import { Role } from "./Role";
import { Unit } from "./Unit";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Table({
  tableName: Rent.rentTableName,
  timestamps: false,
})
export class Rent extends Model {
  public static rentTableName = "rent" as string;
  public static rentId = "rentId" as string;
  public static unitId = "unitId" as string;
  public static userId = "userId" as string;
  public static rentMoveIn = "rentMoveIn" as string;
  public static rentMoveOut = "rentMoveOut" as string;
  public static rentRecurence = "rentRecurence" as string;
  public static rentDueDate = "rentDueDate" as string;
  public static rentValue = "rentValue" as string;
  public static rentInsured = "rentInsured" as string;
  public static rentInsuredType = "rentInsuredType" as string;
    public static rentAgreement = "rentAgreement" as string;
  public static rentIsHold= "rentIsHold" as string;
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
    primaryKey: true,
    field: Rent.rentId,
  })
  rentId!:number;
  @ForeignKey(() => Unit)
  @Column({
    type: DataType.INTEGER,
    field: Rent.unitId,
  })
  unitId!: number;


  @BelongsTo(() =>Unit)
  unit!:Unit;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    field: Rent.userId,
  })
  userId!:string;

  @BelongsTo(() =>User)
  user!:User;


   @HasMany(() => Vehicle)
    vehicle!: Vehicle[];
    
  @Column({
    type: DataType.DATE,
    field: Rent.rentMoveIn,
    allowNull: false, // Cette colonne est obligatoire (non NULL)
  })
  rentMoveIn!: Date;
   @Column({
    type: DataType.DATE,
    field: Rent.rentMoveOut,
    allowNull:false, // Cette colonne est obligatoire (non NULL)
  })
  rentMoveOut!: Date ;

  @Column({
    type: DataType.BOOLEAN,
    field: Rent.rentIsHold,
    allowNull:true, // Cette colonne est obligatoire (non NULL)
    defaultValue:false,
  })
  rentIsHold!: boolean ;


  @Column({
    type: DataType.STRING,
    field: Rent.rentRecurence,
    allowNull: false,  // Cette colonne est obligatoire (non NULL)
  })
  rentRecurence!: string;

  @Column({
    type: DataType.DATE,
    field: Rent.rentDueDate,
    allowNull: false, // Cette colonne est obligatoire (non NULL)
  })
  rentDueDate!: Date;
  @Column({
    type: DataType.DOUBLE,
    field: Rent.rentValue,
    allowNull: false, // Cette colonne est obligatoire (non NULL)
  })
  rentValue!: number;

  @Column({
    type: DataType.DOUBLE,
    field: Rent.rentInsured,
    allowNull: false, // Cette colonne est obligatoire (non NULL)
  })
  rentInsured!: number;
  @Column({
    type: DataType.STRING,
    field: Rent.rentInsuredType,
    allowNull: false,
  })
  rentInsuredType!: string;
  @Column({
    type: DataType.BOOLEAN,
    field: Rent.isDeleted,
    allowNull: false,
    
  })
  isDeleted!: boolean; // Cette colonne est obligatoire (non NULL)

  @Column({
    type: DataType.STRING,
    field: Rent.createdBy,
    allowNull: false, // Cette colonne peut être NULL
  })
  createdBy!: string; 

  @Column({
    type: DataType.STRING,
    field: Rent.updatedBy,
    allowNull: true, // Cette colonne est obligatoire (non NULL)
  })
  updatedBy!: string; 

  @Column({
    type: DataType.STRING,
    field: Rent.deletedBy,
    allowNull: true, // Cette colonne peut être NULL
  })
  deletedBy!: true;

  @Column({
  type: DataType.STRING,
  field: Rent.rentAgreement,
  allowNull: true,
})
rentAgreement!: string | null;

  @Column({
    type: DataType.DATE,
    field: Rent.createdAt,
    allowNull: true,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Rent.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Rent.deletedAt,
    allowNull: true, // Cette colonne peut être NULL
  })
  deletedAt!: Date;
 
}
