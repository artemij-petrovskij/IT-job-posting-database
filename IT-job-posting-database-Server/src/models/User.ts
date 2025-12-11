import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Role } from "./Role";
import { Company } from "./Company";

@Table
export class User extends Model {
  // @Column({ type: DataType.STRING, allowNull: false })
  // email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;
//
  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER, allowNull: true })
  companyId!: number;

  @BelongsTo(() => Company)
  company!: Company;
}
