import { FindOptions } from "sequelize";
import { Customer } from "../connectDB";
import * as bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
      role: 2,
    };
    const customer = await Customer.create(encryptData);
    return customer;
  };

  public static updateInfo: any = async (data: any) => {
    const customer = await Customer.findOne({
      where: { email: data?.email },
    });
    if (customer) {
      await customer.update({
        ...data
      })
      await customer.save()
      return {
        error: false,
        message: "Update successful!",
      };
    } else {
      return {
        error: true,
        message: "Account does not exist!",
      };
    }
  };

  public static changePassword: any = async (data: any) => {
    const customer = await Customer.findOne({
      where: { email: data?.email },
    });
    if (customer && data) {
      const password = await bcrypt.hash(data?.password, 10)
      await customer.update({
        password: password,
      })
      await customer.save()
      return {
        error: false,
        message: "Account does not exist!",
      };
    }
  };

  private static generateResetString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result; 
  }

  public static sendEmailToResetPassword = async (user: any, redirectUri: string) => {
    // try {
    //   const adminEmail = "thumomm10@gmail.com";
    //   const refreshTokenGmail = this.configService.get(
    //     ConfigKey.REFRESH_TOKEN_GMAIL,
    //   );
    //   const clientSecret = this.configService.get(
    //     ConfigKey.GOOGLE_CLIENT_SECRET,
    //   );
    //   const clientId = this.configService.get(ConfigKey.GOOGLE_CLIENT_ID);

    //   const googleClient = new OAuth2Client({ clientSecret, clientId });
    //   googleClient.setCredentials({ refresh_token: refreshTokenGmail });

    //   const myAccessTokenObj = await googleClient.getAccessToken();
    //   const myAccessToken = myAccessTokenObj?.token;

    //   const transport = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       type: 'OAuth2',
    //       user: adminEmail,
    //       clientId,
    //       clientSecret,
    //       refreshToken: refreshTokenGmail,
    //       accessToken: myAccessToken,
    //     },
    //   });

    //   // calculate data to include in email content
    //   const userId = user.account_id;
    //   const resetString = this.generateResetString(user);
    //   const urlReset = `${redirectUri}?userId=${userId}&resetString=${resetString.resetString}`;

    //   await transport.sendMail(
    //     {
    //       to: user.email,
    //       subject: 'RETSET PASSWORD PROTEAM',
    //       text: 'Plaintext version of the message',
    //       html: `<p>Visit the following link to reset your password <a target="_blank" href="${urlReset}">Rest password Proteam</a></p>`,
    //     },
    //     (error, info) => {
    //       console.log(error);
    //     },
    //   );
    // } catch (error) {
    //   throw new InternalServerErrorException(error);
    // }
  }

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
        message: "Login successful!",
      };
    } else {
      return {
        error: true,
        message: "Email or password is incorrect!",
      };
    }
  };
}
