import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Permission } from "./Permission";
import { User } from "./User";
import { PermissionRole } from "./PermissionRole";
@Table({
  tableName: Role.roleTableName,
  timestamps: false,
})
export class Role extends Model {
  public static roleTableName = "role" as string;
  public static roleId = "roleId" as string;
  public static roleName = "roleName" as string;
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
    field: Role.roleId,
  })


  roleId!: number;
  // Relation avec Permission via PermissionRole
  @BelongsToMany(() => Permission, () => PermissionRole)
  permissions!: Permission[];
  @HasMany(() => User)
  user!: User[]; 
  @Column({
    type: DataType.STRING,
    field: Role.roleName, 
    allowNull: false,
  })
  roleName!: string;
  @Column({
    type: DataType.STRING,
    field: Role.createdBy,
  })
  createdBy!: string;
  @Column({
    type: DataType.STRING,
    field: Role.updatedBy,
  })
  updatedBy!: string;
  @Column({
    type: DataType.STRING,
    field: Role.deletedBy,
  })
  deletedBy!: string;
  @Column({
    type: DataType.BOOLEAN,
    field: Role.isDeleted,
    allowNull: true,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.DATE,
    field: Role.createdAt,
    allowNull: false,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Role.updatedAt,
    allowNull: true,
  })
  updatedAt!: Date;
  @Column({
    type: DataType.DATE,
    field: Role.deletedAt,
  })
  deletedAt!: Date;
}