import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Role } from "./Role";
import { Permission } from "./Permission";

@Table({
  tableName: PermissionRole.permissionroleTableName,
  timestamps: false,
})
export class PermissionRole extends Model {
  public static permissionroleTableName = "permissionrole" as string;
  public static permissionroleId = "permissionroleId" as string;
  public static roleId = "roleId" as string;
  public static permissionId = "permissionId" as string;
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
    field: PermissionRole.permissionroleId,
  })
  permissionroleId!: number;
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    field: PermissionRole.roleId,
  })
  roleId!: number;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    field: PermissionRole.permissionId,
  })
  permissionId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @BelongsTo(() => Permission)
  permission!: Permission;
  @Column({
    type: DataType.STRING,
    field: PermissionRole.createdBy,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: PermissionRole.updatedBy,
  })
  updatedBy!: string;
  @Column({
    type: DataType.STRING,
    field: PermissionRole.deletedBy,
  })
  deletedBy!: string;
  @Column({
    type: DataType.BOOLEAN,
    field: PermissionRole.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: PermissionRole.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PermissionRole.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: PermissionRole.deletedAt,
  })
  deletedAt!: Date;
}  