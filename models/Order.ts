import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Customer } from "./Customer";

@Table({
    timestamps: true,
    tableName: "orders",
})
export class Order extends BaseModel {
    @ForeignKey(() => Customer)
    @Column({type: DataType.INTEGER})
    customer_id: number;

    @BelongsTo(() => Customer)
    customer: Customer

    @Column({type: DataType.DATE})
    date: Date;

    @Column({type: DataType.INTEGER})
    total_payment: number;
}