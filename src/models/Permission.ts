import { Model, Table, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Role } from "./Role";
import { PermissionRole } from "./PermissionRole";
@Table({
  tableName: Permission.permissionTableName,
  timestamps: false
})
export class Permission extends Model {
  public static permissionTableName = "permission" as string;
  public static permissionId = "permissionId" as string;
  public static roleId = "roleId" as string;
  public static permissionLink = "permissionLink" as string;
  public static permissionName = "permissionName" as string;
  public static createdBy = "createdBy" as string;
  public static updatedBy = "updatedBy" as string;
  public static deletedBy = "deletedBy" as string;
  public static isDeleted = "isDeleted" as string;
  public static deletedAt = "deletedAt" as string;
  public static createdAt = "createdAt" as string;
  public static updatedAt = "updatedAt" as string;
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Permission.permissionId
  })
  id!: number

  @BelongsToMany(() => Role, {
    through: () => PermissionRole,
  })
  roles!: Role[];
  @Column({
    type: DataType.STRING,
    field: Permission.permissionName,
    allowNull: false,
  })
  permissionName!: string;
  @Column({
    type: DataType.STRING,
    field: Permission.permissionLink,
    allowNull: false,
  })
  permissionLink!: string;
  @Column({
    type: DataType.STRING,
    field: Permission.createdBy,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: Permission.updatedBy,
  })
  updatedBy!: string;
  @Column({
    type: DataType.STRING,
    field: Permission.deletedBy,
    allowNull: true,
  })
  deletedBy!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Permission.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Permission.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Permission.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Permission.deletedAt,
    allowNull: true,
  })
  deletedAt!: Date;

}