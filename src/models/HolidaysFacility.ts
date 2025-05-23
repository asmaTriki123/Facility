import { Table, Column, DataType, PrimaryKey, ForeignKey, Model, BelongsTo, AutoIncrement, HasMany } from "sequelize-typescript";
import { Facility } from "./Facility";
import { Holidays } from "./Holidays";

@Table({
    tableName: HolidaysFacility.holidaysFacilityTableName,
    timestamps: false,
})
export class HolidaysFacility extends Model {
    public static holidaysFacilityTableName = "holidaysFacility" as string;
    public static holidaysfacilityId = "holidaysfacilityId" as string;
    public static facilityId = "facilityId" as string;
    public static holidaysId = "holidaysId" as string;
    public static holidaysIsOptionAvailable = "holidaysIsOptionAvailable" as string
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
        field: HolidaysFacility.holidaysfacilityId,
        allowNull: false,

    })
    holidaysfacilityId!: number;

    @ForeignKey(() => Holidays)
    @Column({
        type: DataType.INTEGER,
        field: HolidaysFacility.holidaysId,
        allowNull: false,

    })
    holidaysId!: number;
    @BelongsTo(() => Holidays)
    holidays!: Holidays;

    @ForeignKey(() => Facility)
    @Column({
        type: DataType.INTEGER,
        field: HolidaysFacility.facilityId,
    })
    facilityId!: number;

    @BelongsTo(() => Facility)
    facility!: Facility;
    @Column({
        type: DataType.BOOLEAN,
        field: HolidaysFacility.holidaysIsOptionAvailable,
        allowNull: false,
    })
    holidaysIsOptionAvailable!: boolean;
    @Column({
        type: DataType.STRING,
        field: HolidaysFacility.createdBy,
        allowNull: false,
    })
    createdBy!: string;
    @Column({
        type: DataType.INTEGER,
        field: HolidaysFacility.updatedBy,
        allowNull: true,
    })
    updatedBy!: number;

    @Column({
        type: DataType.INTEGER,
        field: HolidaysFacility.deletedBy,
        allowNull: true,
    })
    deletedBy!: number;

    @Column({
        type: DataType.BOOLEAN,
        field: HolidaysFacility.isDeleted,
        allowNull: false,
    })
    isDeleted!: boolean;
    @Column({
        type: DataType.DATE,
        field: HolidaysFacility.createdAt,
        allowNull: true,
    })
    createdAt!: Date;
    @Column({
        type: DataType.DATE,
        field: HolidaysFacility.updatedAt,
        allowNull: true,
    })
    updatedAt!: Date;
    @Column({
        type: DataType.DATE,
        field: HolidaysFacility.deletedAt,
        allowNull: true,
    })
    deletedAt!: Date;
}
