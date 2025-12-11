import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Vacancy } from "./Vacancy";
import { User } from "./User";
import { Application } from "./Application";
@Table
export class Company extends Model {
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name!: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description?: string;

    @HasMany(() => Vacancy)
    vacancies!: Vacancy[];

    @HasMany(() => User)
    users!: User[];

    @HasMany(() => Application)
    applications!: Application[];
}
