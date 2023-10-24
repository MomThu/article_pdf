import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Order } from "./Order";
import { Article } from "./Article";

@Table({
    timestamps: true,
    tableName: "orders_detail",
})
export class OrderDetail extends BaseModel {
    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    order_id: number;

    @BelongsTo(() => Order)
    order: Order

    @ForeignKey(() => Article)
    @Column({type: DataType.INTEGER})
    article_id: number;

    @BelongsTo(() => Article)
    article: Article

    @Column({type: DataType.INTEGER})
    price: number;
}