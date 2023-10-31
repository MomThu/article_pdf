import { FindOptions } from "sequelize";
import {Customer} from "../connectDB";
export class CustomerRepository extends Customer {
  public static findAllRaw = async (options?: FindOptions) => {
    const datas = await Customer.findAll(options);
    return datas;
  }

  public static addCustomer: any = async (data: any) => {
    const checkCusExist = await Customer.findOne({where: {email: data?.email}})
    if (checkCusExist) {
      return {
        error: true,
        message: "Email already exist!"
      }
    }
    const customer = await Customer.create(data);
    return customer;
  }

  public static updateInfo: any = async (data: any) => {
    const checkCusExist = await Customer.findOne({where: {email: data?.email}})
    if (checkCusExist) {
      return {
        error: true,
        message: "Email already exist!"
      }
    }
    const customer = await Customer.create(data);
    return customer;
  }
}
