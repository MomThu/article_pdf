import { Column, DataType, Table, BelongsToMany, AllowNull } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Author } from "./Author";
import { ArticleAuthor } from "./ArticleAuthor";

@Table({
    timestamps: true,
    tableName: "articles",
})
export class Article extends BaseModel {
    @Column({type: DataType.TEXT})
    title: string;

    @Column({type: DataType.TEXT})
    abstract: string;

    @Column({type: DataType.DATE})
    publish_date: Date;

    @Column({type: DataType.TEXT})
    journal_name: string;

    @BelongsToMany(() => Author, {
        through: () => ArticleAuthor
    })
    author: Author[]
}