import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";

@Table({
    timestamps: true,
    tableName: "customers",
})
export class Customer extends BaseModel {
    @Column({type: DataType.STRING})
    email: string;

    @Column({type: DataType.STRING})
    full_name: string;

    @Column({type: DataType.STRING})
    phone: string;
}