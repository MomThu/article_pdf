import { FindOptions } from "sequelize";
import { Customer } from "../connectDB";
import * as bcrypt from "bcrypt";
export class CustomerRepository extends Customer {
  public static findAllRaw = async (options?: FindOptions) => {
    const datas = await Customer.findAll(options);
    return datas;
  };

  public static addCustomer: any = async (data: any) => {
    const checkCusExist = await Customer.findOne({
      where: { email: data?.email },
    });
    if (checkCusExist) {
      return {
        error: true,
        message: "Email already exist!",
      };
    }
    const encryptData = {
      ...data,
      password: await bcrypt.hash(data?.password, 10),
    };
    const customer = await Customer.create(encryptData);
    return customer;
  };

  public static updateInfo: any = async (data: any) => {
    const checkCusExist = await Customer.findOne({
      where: { email: data?.email },
    });
    if (checkCusExist) {
      return {
        error: true,
        message: "Email already exist!",
      };
    }
    const customer = await Customer.create(data);
    return customer;
  };

  public static login: any = async (data: any) => {
    const customer = await Customer.findOne({
      where: { email: data?.email },
    });
    if (
      customer &&
      customer?.password === data?.password
      // (await bcrypt.compare(data?.password, customer?.password))
    ) {
      return {
        error: false,
        user: {
          id: customer?.id,
          email: customer?.email,
          full_name: customer?.full_name
        },
        message: "Login successful!",
      };
    } else {
      return {
        error: true,
        message: "You are not authorized!",
      };
    }
  };
}
