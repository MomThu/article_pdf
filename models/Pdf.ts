import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Author } from "./Author";
import { Article } from "./Article";
import { Customer } from "./Customer";

@Table({
    timestamps: true,
    tableName: "pdfs",
})
export class Pdf extends BaseModel {
    @ForeignKey(() => Article)
    @Column({type: DataType.INTEGER})
    article_id: number;

    @Column({type: DataType.STRING})
    file_name: string;

    @Column({type: DataType.STRING})
    url: string;

    @Column({type: DataType.STRING})
    password: string;

}