import { Table, Column, DataType, PrimaryKey, ForeignKey, Model, BelongsTo, AutoIncrement } from "sequelize-typescript";
import { Unit } from "./Unit";
import { UnitSpecificAmenities } from "./UnitSpecificAmenities";

@Table({
    tableName: AmenitiesUnit.AmenitiesUnitTableName,
    timestamps: false,
})
export class AmenitiesUnit extends Model {
    public static AmenitiesUnitTableName = "AmenitiesUnit" as string;
    public static amenitiesunitId = "amenitiesunitId" as string;
    public static UnitSpecificAmenitiesId = "UnitSpecificAmenitiesId" as string;
    public static unitId = "unitId" as string;
    public static UnitSpecificAmenitiesIsOptionAvailable = "UnitSpecificAmenitiesIsOptionAvailable" as string
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
        field: AmenitiesUnit.amenitiesunitId,
        allowNull: false,
    })
    amenitiesunitId!: number;



    @ForeignKey(() => Unit)
    @Column({
        type: DataType.INTEGER,
        field: AmenitiesUnit.unitId,
        allowNull: false,

    })
    unitId!: number;
    @BelongsTo(() => Unit)
    unit!: Unit;


    @ForeignKey(() => UnitSpecificAmenities)
    @Column({
        type: DataType.INTEGER,
        field: AmenitiesUnit.UnitSpecificAmenitiesId,
    })
    UnitSpecificAmenitiesId!: number;

    @BelongsTo(() => UnitSpecificAmenities)
    unitSpecificAmenities!: UnitSpecificAmenities;

    @Column({
        type: DataType.STRING,
        field: AmenitiesUnit.createdBy,
        allowNull: false,
    })
    createdBy!: string;
    @Column({
        type: DataType.INTEGER,
        field: AmenitiesUnit.updatedBy,
        allowNull: true,
    })
    updatedBy!: number;

    @Column({
        type: DataType.INTEGER,
        field: AmenitiesUnit.deletedBy,
        allowNull: true,
    })
    deletedBy!: number;


    @Column({
        type: DataType.BOOLEAN,
        field: AmenitiesUnit.UnitSpecificAmenitiesIsOptionAvailable,
        allowNull: true,
    })
    UnitSpecificAmenitiesIsOptionAvailable!: number;

    @Column({
        type: DataType.BOOLEAN,
        field: AmenitiesUnit.isDeleted,
        allowNull: false,
    })
    isDeleted!: boolean;
    @Column({
        type: DataType.DATE,
        field: AmenitiesUnit.createdAt,
        allowNull: false,
    })
    createdAt!: Date;
    @Column({
        type: DataType.DATE,
        field: AmenitiesUnit.updatedAt,
        allowNull: true,
    })
    updatedAt!: Date;
    @Column({
        type: DataType.DATE,
        field: AmenitiesUnit.deletedAt,
        allowNull: true,
    })
    deletedAt!: Date;
}
