import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Vacancy } from "./Vacancy";
import { User } from "./User";
import { Company } from "./Company";
import { Resume } from "./Resume";

@Table
export class Application extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    coverLetter!: string;

    @ForeignKey(() => Vacancy)
    @Column({ type: DataType.INTEGER, allowNull: false })
    vacancyId!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @BelongsTo(() => Vacancy)
    vacancy!: Vacancy;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Company)
    @Column({ type: DataType.INTEGER, allowNull: true })
    companyId!: number;

    @BelongsTo(() => Company)
    company!: Company;

    /// Добавляем в Application
    @ForeignKey(() => Resume)
    @Column({ type: DataType.INTEGER, allowNull: true })
    resumeId!: number;

    @BelongsTo(() => Resume, { onDelete: 'CASCADE' })
    resume!: Resume;
    ///
}
