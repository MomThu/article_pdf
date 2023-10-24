import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Customer } from "./Customer";

@Table({
    timestamps: true,
    tableName: "carts",
})
export class Cart extends BaseModel {
    @ForeignKey(() => Customer)
    @Column({type: DataType.INTEGER})
    customer_id: string;

    @Column({type: DataType.INTEGER})
    article_id: string;

    @Column({type: DataType.DATE})
    date: Date;
}