import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";

@Table({
    timestamps: true,
    tableName: "authors",
})
export class Author extends BaseModel {
    @Column({type: DataType.STRING})
    fullname: string;

    @Column({type: DataType.STRING})
    department: string;

    @Column({type: DataType.STRING})
    address: string;

    @Column({type: DataType.STRING})
    email: string;
}