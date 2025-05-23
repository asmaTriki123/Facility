import { Model, Table, Column, DataType } from "sequelize-typescript";
@Table({
  tableName: Settings.settingsTableName,
  timestamps: false,
})
export class Settings extends Model {
  public static settingsTableName = "settings" as string;
  public static settingsId = "settingsId" as string;
  public static settingsPhone = "settingsPhone" as string;
  public static settingsDate = "settingsDate" as string;
  public static settingsCurrency= "settingsCurrency" as string;
  public static settingsBilingPeriod= "settingsBilingPeriod" as string;
  
  public static updatedBy = "updatedBy" as string;
  public static createdBy = "createdBy" as string;
  public static updatedAt = "updatedAt" as string;
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Settings.settingsId,
  })
  settingsId!: number;
  @Column({
    type: DataType.STRING,
    field: Settings.settingsPhone,
    allowNull: true,
  })
  settingsPhone!: string;
  
  @Column({
    type: DataType.STRING,
    field: Settings.settingsDate,
    allowNull: true,
  })
  settingsDate!: string;
  
  @Column({
    type: DataType.STRING,
    field: Settings.settingsCurrency,
    allowNull: true,
  })
  settingsCurrency!: string;
  
  @Column({
    type: DataType.INTEGER,
    field: Settings.settingsBilingPeriod,
    allowNull: true,
  })
  settingsBilingPeriod!:number ;
  @Column({
    type: DataType.STRING,
    field: Settings.updatedBy,
    allowNull: true,
  })
  updatedBy!: string;
  @Column({
    type: DataType.STRING,
    field: Settings.createdBy,
    allowNull: true,
  })
  createdBy!: string;
  @Column({
    type: DataType.DATE,
    field: Settings.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;

}