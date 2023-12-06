import { omitBy, toNumber } from "lodash";
import { FindOptions } from "sequelize";
import { Customer } from "../connectDB";
import * as bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export class CustomerRepository extends Customer {
  public static findAllRaw = async (options?: FindOptions) => {
    const datas = await Customer.findAll(options);
    return datas;
  };

  public static addCustomer = async (data: any) => {
    const checkCusExist = await Customer.findOne({
      where: { email: data?.email },
    });
    if (checkCusExist) {
      return {
        error: true,
        message: "Email đã tồn tại!",
      };
    }
    const encryptData = {
      ...data,
      password: await bcrypt.hash(data?.password, 10),
      role: 2,
    };
    try {
      const customer = await Customer.create(encryptData);
      return {
        error: false,
        message: "Tạo tài khoản thành công!",
      };
    } catch (err) {
      return {
        error: true,
        message: "Tạo tài khoản thất bại!",
      };
    }
  };

  public static updateInfo = async (data: any) => {
    if (!data?.id) {
      return {
        error: true,
        message: "Bạn cần đăng nhập để thực hiện chức năng này!",
      };
    } else {
      const dataResult = omitBy(data, v => !v);
      console.log(dataResult, "data result");
      
      const customer = await Customer.findByPk(dataResult?.id);
      if (customer) {
        await customer.update({
          ...dataResult,
        });
        await customer.save();
        return {
          error: false,
          message: "Cập nhật thông tin thành công!",
        };
      } else {
        return {
          error: true,
          message: "Tài khoản không tồn tại!",
        };
      }
    }
  };

  public static resetPassword = async (
    cusId: string,
    password: string,
    resetString: string
  ) => {
    const customer = await Customer.findOne({
      where: {
        id: toNumber(cusId),
        reset: resetString,
      },
    });
    if (customer) {
      try {
        const passwordHash = await bcrypt.hash(password, 10);
        await customer.update({
          password: passwordHash,
        });
        await customer.save();
        return {
          error: false,
          message: "Cập nhật mật khẩu thành công!",
        };
      } catch (err) {
        return {
          error: true,
          message: "Cập nhật mật khẩu thất bại!",
        };
      }
    } else {
      return {
        error: true,
        message: "Tài khoản không tồn tại!",
      };
    }
  };

  public static changePassword = async (
    cusId: number,
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      const customer = await Customer.findOne({
        where: {
          id: cusId,
        },
      });
      if (customer && (await bcrypt.compare(oldPassword, customer?.password))) {
        try {
          const newPasswordHash = await bcrypt.hash(newPassword, 10);
          await customer.update({
            password: newPasswordHash,
          });
          await customer.save();
          return {
            error: false,
            message: "Cập nhật mật khẩu thành công!",
          };
        } catch (err) {
          return {
            error: true,
            message: "Cập nhật mật khẩu thất bại!",
          };
        }
      } else {
        return {
          error: true,
          message: "Mật khẩu không chính xác. Vui lòng thử lại!",
        };
      }
    } catch (err) {
      return {
        error: true,
        message: "Cập nhật mật khẩu thất bại!",
      };
    }
  };

  private static generateResetString = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  public static sendEmailToResetPassword = async (
    data: string,
    redirectUri: string
  ) => {
    const customer = await Customer.findOne({
      where: { email: data },
    });
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const password = process.env.PASSWORD_EMAIL;
      const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: adminEmail,
          pass: password,
        },
      });

      const userId = customer.id;
      const resetString = this.generateResetString(10);
      await customer.update({
        reset: resetString,
      });
      await customer.save();
      const urlReset = `${redirectUri}?userId=${userId}&resetString=${resetString}`;

      await transport.sendMail(
        {
          to: customer.email,
          subject: "RETSET PASSWORD",
          text: "Plaintext version of the message",
          html: `<p>Visit the following link to reset your password <a target="_blank" href="${urlReset}">Reset your password</a></p>`,
        },
        (error, info) => {
          console.log(error);
        }
      );
      return {
        error: false,
        message: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu mới!",
      };
    } catch (error) {
      return {
        error: true,
        message: "Không thể gửi email!",
      };
    }
  };

  public static login: any = async (data: any) => {
    const customer = await Customer.findOne({
      where: { email: data?.email },
    });
    if (
      customer &&
      (await bcrypt.compare(data?.password, customer?.password))
    ) {
      return {
        error: false,
        user: {
          id: customer?.id,
          email: customer?.email,
          full_name: customer?.full_name,
          role: customer?.role,
        },
        message: "Đăng nhập thành công!",
      };
    } else {
      return {
        error: true,
        message: "Email hoặc mật khẩu không chính xác!",
      };
    }
  };
}
