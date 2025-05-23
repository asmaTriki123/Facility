import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Facility } from "./Facility";

@Table({
  tableName:Coordinate.coordinateTableName ,
  timestamps: false,
})
export class Coordinate extends Model {
  // Utilisation du type `string` au lieu de `String`
  public static coordinateTableName = "coordinate" as string;
  public static coordinateId = "coordinateId" as string;
  public static coordinateAddress = "coordinateAddress" as string;
  public static coordinateCity = "coordinateCity" as string;
  public static coordinateState = "coordinateState" as string;
  public static coordinateZip = "coordinateZip" as string;
  public static facilityId = "facilityId" as string;
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
    field: Coordinate.coordinateId,
    allowNull: false,  
  })
  coordinateId!: number;  
  

   @ForeignKey(() => Facility)
      @Column({
        type: DataType.INTEGER,
        field: Coordinate.facilityId,
      })
      facilityId!: number;
    
      @BelongsTo(() => Facility)
      facility!: Facility;

      
  @Column({
    type: DataType.STRING,
    field: Coordinate.coordinateAddress,  
    allowNull: true,
  })
  coordinateAddress!: string;

    @Column({
    type: DataType.STRING,
    field: Coordinate.coordinateCity,  
    allowNull: true,
  })
 coordinateCity!: string;

   @Column({
    type: DataType.STRING,
    field: Coordinate.coordinateState,  
    allowNull: true,
  })
  coordinateState!: string;

   @Column({
    type: DataType.STRING,
    field: Coordinate.coordinateZip,  
    allowNull: true,
  })
  coordinateZip!: string;
  
  @Column({
    type: DataType.STRING,
    field: Coordinate.createdBy,
    allowNull: false,
  })
  createdBy!: string;


 @Column({
    type: DataType.STRING,
    field: Coordinate.updatedBy,
    allowNull: true,
})
 updatedBy!: string;
 
 @Column({
    type: DataType.STRING,
    field: Coordinate.deletedBy,
    allowNull: true,
})
 deletedBy!: string;

 @Column({
    type: DataType.BOOLEAN,
    field: Coordinate.isDeleted,
    allowNull: false,
})
 isDeleted!: boolean;
 @Column({
  type: DataType.DATE,
  field: Coordinate.createdAt,
  allowNull: true,
})
createdAt!: Date;
@Column({
  type: DataType.DATE,
  field: Coordinate.updatedAt,
  allowNull: true,
})
updatedAt!: Date;
 @Column({
    type: DataType.DATE,
    field: Coordinate.deletedAt,
    allowNull: true,
})
 deletedAt!: Date;
}
