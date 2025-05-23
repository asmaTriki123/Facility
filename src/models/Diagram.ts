import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Facility } from "./Facility";

export default interface DiagramElement {
    id: string | number;
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor: string;
    borderColor: string;
    shape: string;
    label?: string;
    zIndex?: number;
    rotation?: number;
    is3D?: boolean;
    rotation3D?: {
        x: number;
        y: number;
        z: number;
    };
}

@Table({
    tableName: "diagrams",
    timestamps: true,
    paranoid: true
})
export class Diagram extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Facility)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    facilityId!: number;

    @BelongsTo(() => Facility)
    facility!: Facility;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId!: string;

@Column({
  type: DataType.TEXT,
  allowNull: false,
  defaultValue: '[]',
  get() {
    const rawValue = this.getDataValue('elements');
    try {
      return rawValue ? JSON.parse(rawValue) : [];
    } catch (error) {
      console.error("Error parsing elements:", error);
      return [];
    }
  },
  set(value: DiagramElement[]) {
    try {
      this.setDataValue('elements', JSON.stringify(value));
    } catch (error) {
      console.error("Error stringifying elements:", error);
      this.setDataValue('elements', '[]');
    }
  }
})
elements!: DiagramElement[];

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    createdBy!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    updatedBy!: string | null;

    async updateElements(elements: DiagramElement[], userId: string): Promise<this> {
        this.elements = elements;
        this.updatedBy = userId;
        return this.save();
    }
}