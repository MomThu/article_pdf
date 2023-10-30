import { FindOptions } from "sequelize";
// import { Customer } from "./../models/Customer";
import Customer from "../models/Customer";
export class CustomerRepository extends Customer {
  public static async findAllRaw(options?: FindOptions) {
    const datas = await Customer.findAll(options);
    const rawData = datas.map((data) => ({
      ...data.toJSON(),
      createdAt: data.createdAt.toString(),
      updatedAt: data.updatedAt.toString(),
    }));
    return rawData;
  }

  public static async findOneRaw(options?: FindOptions) {
    const data = await Customer.findOne(options);
    if (!data) {
      throw Error("Not found data!!!");
    }

    const rawData = {
      ...data.toJSON(),
      createdAt: data.createdAt.toString(),
      updatedAt: data.updatedAt.toString(),
    };
    return rawData;
  }
}
