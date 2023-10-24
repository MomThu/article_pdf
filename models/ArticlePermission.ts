import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Author } from "./Author";
import { Article } from "./Article";
import { Customer } from "./Customer";

@Table({
    timestamps: true,
    tableName: "article_permission",
})
export class ArticlePermission extends BaseModel {
    @ForeignKey(() => Article)
    @Column({type: DataType.INTEGER})
    article_id: number;

    @ForeignKey(() => Customer)
    @Column({type: DataType.INTEGER})
    customer_id: number;

    @Column({type: DataType.INTEGER})
    type_of_permission: number;

}