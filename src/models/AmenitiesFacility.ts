import { Table, Column, DataType, PrimaryKey, ForeignKey, Model, BelongsTo, AutoIncrement } from "sequelize-typescript";
import { CategoryUnit } from "./CategoryUnit";
import { Unit } from "./Unit";
import { Facility } from "./Facility";
import { Amenities } from "./Amenities";

@Table({
    tableName: AmenitiesFacility.AmenitiesFacilityTableName,
    timestamps: false,
})
export class AmenitiesFacility extends Model {
    public static AmenitiesFacilityTableName = "AmenitiesFacility" as string;
    public static amenitiesfacilityId = "amenitiesfacilityId" as string;
    public static facilityId = "facilityId" as string;
    public static amenitiesId = "amenitiesId" as string;
    public static amenitiesIsOptionAvailable = "amenitiesIsOptionAvailable" as string
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
        field: AmenitiesFacility.amenitiesfacilityId,
        allowNull: false,
    })
    amenitiesfacilityId!: number;
    @PrimaryKey
    @ForeignKey(() => Amenities)
    @Column({
        type: DataType.INTEGER,
        field: AmenitiesFacility.amenitiesId,
        allowNull: false,

    })
    amenitiesId!: number;
    @BelongsTo(() => Amenities)
    amenities!: Amenities;

    @ForeignKey(() => Facility)
    @Column({
        type: DataType.INTEGER,
        field: AmenitiesFacility.facilityId,
    })
    facilityId!: number;

    @BelongsTo(() => Facility)
    facility!: Facility;
    @Column({
        type: DataType.BOOLEAN,
        field: AmenitiesFacility.amenitiesIsOptionAvailable,
        allowNull: false,
      })
      amenitiesIsOptionAvailable!: boolean;
    @Column({
        type: DataType.STRING,
        field: AmenitiesFacility.createdBy,
        allowNull: false,
    })
    createdBy!: string;
    @Column({
        type: DataType.STRING,
        field: AmenitiesFacility.updatedBy,
        allowNull: true,
    })
    updatedBy!: string;

    @Column({
        type: DataType.STRING,
        field: AmenitiesFacility.deletedBy,
        allowNull: true,
    })
    deletedBy!: string;

    @Column({
        type: DataType.BOOLEAN,
        field: AmenitiesFacility.isDeleted,
        allowNull: false,
    })
    isDeleted!: boolean;
    @Column({
        type: DataType.DATE,
        field: AmenitiesFacility.createdAt,
        allowNull: true,
    })
    createdAt!: Date;
    @Column({
        type: DataType.DATE,
        field: AmenitiesFacility.updatedAt,
        allowNull: true,
    })
    updatedAt!: Date;
    @Column({
        type: DataType.DATE,
        field: AmenitiesFacility.deletedAt,
        allowNull: true,
    })
    deletedAt!: Date;
}
