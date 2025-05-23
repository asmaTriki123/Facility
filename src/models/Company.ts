import { Table, Column, DataType, PrimaryKey, Model, AutoIncrement, ForeignKey, BelongsTo, HasMany, Unique } from "sequelize-typescript";
import { User } from "./User";

@Table({
    tableName: Company.companyTableName,
    timestamps: false,
})

export class Company extends Model {
    public static companyTableName = "company" as string;
    public static companyId = "companyId" as string;
    public static companyName = "companyName" as string;
    public static companyEIN = "companyEIN" as string;
    public static companyAddress = "companyAddress" as string;
    public static companyIsActive = "companyIsActive" as string;

    public static companyCountry = "companyCountry" as string;
    public static companyState = "companyState" as string;
    public static companyCity = "companyCity" as string;
    public static companyPostalCode = "companyPostalCode" as string;


    public static createdBy = "createdBy" as string;
    public static isDeleted = "isDeleted" as string;
    public static createdAt = "createdAt" as string;
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: Company.companyId,
        allowNull: false,
    })
    companyId!: number;
    @HasMany(() => User)
    users!: User[];

    @Column({
        type: DataType.STRING,
        field: Company.companyName,
        allowNull: false,
    })
    companyName!: string;
    @Column({
        type: DataType.STRING,
        field: Company.companyEIN,
        allowNull: false,
    })
    companyEIN!: string;
    @Column({
        type: DataType.STRING,
        field: Company.companyCountry,
        allowNull: false,
    })

    companyCountry!: string;

    @Column({
        type: DataType.STRING,
        field: Company.companyState,
        allowNull: false,
    })

    companyState!: string;

    @Column({
        type: DataType.STRING,
        field: Company.companyCity,
        allowNull: false,
    })

    companyCity!: string;

    @Column({
        type: DataType.STRING,
        field: Company.companyPostalCode,
        allowNull: false,
    })

    companyPostalCode!: string;


    @Column({
        type: DataType.STRING,
        field: Company.companyAddress,
        allowNull: false,
    })

    companyAddress!: string;

    @Column({
        type: DataType.BOOLEAN,
        field: Company.companyIsActive,
        allowNull: false,
        defaultValue: true,
    })

    companyIsActive!: Boolean;

    @Column({
        type: DataType.STRING,
        field: Company.createdBy,
        allowNull: true,
    })
    createdBy!: string;
    @Column({
        type: DataType.DATE,
        field: Company.createdAt,
        allowNull: false,
    })
    createdAt!: Date;

    @Column({
        type: DataType.BOOLEAN,
        field: Company.isDeleted,
        allowNull: true,
    })
    isDeleted!: boolean;



}
