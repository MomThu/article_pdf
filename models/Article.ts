import { Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Author } from "./Author";
import { ArticleAuthor } from "./ArticleAuthor";

@Table({
    timestamps: true,
    tableName: "articles",
})
export class Article extends BaseModel {
    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.STRING})
    abstract: string;

    @Column({type: DataType.DATE})
    publish_date: Date;

    @Column({type: DataType.STRING})
    journal_name: string;

    @BelongsToMany(() => Author, {
        through: () => ArticleAuthor
    })
    author: Author[]
}