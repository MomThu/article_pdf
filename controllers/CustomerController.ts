import { get, toNumber } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { CustomerRepository } from "../services";

const getAllCustomers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result = await CustomerRepository.findAll();
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (err) {
    throw err;
  }
};

const getCustomerById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cusId = req.query.id;
    let data = await CustomerRepository.findByPk(toNumber(cusId));
    data.password = "";
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    const customer = await CustomerRepository.addCustomer({
      email: data?.email,
      full_name: data?.full_name,
      phone: data?.phone,
      password: data?.password,
    });
    if (customer?.error) {
      res.status(400).json({
        error: true,
        message: customer?.message,
      });
    }
    res.status(200).json({
      error: false,
      data: customer,
    });
  } catch (err) {
    throw err;
  }
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    const customer = await CustomerRepository.login({
      email: data?.email,
      password: data?.password,
    });
    if (customer?.error) {
      res.status(401).json({
        error: true,
        message: customer?.message,
      });
    }
    res.status(200).json({
      error: false,
      data: customer,
    });
  } catch (err) {
    throw err;
  }
};

const updateInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    const customer = await CustomerRepository.updateInfo({
      ...data,
    });
    if (customer?.error) {
      res.status(404).json({
        error: true,
        message: get(customer, "message", "Cập nhật thông tin thất bại!"),
      });
    }
    res.status(200).json({
      error: false,
      message: get(customer, "message", "Cập nhật thông tin thành công!"),
    });
  } catch (err) {
    throw err;
  }
};

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cusId, password, resetString } = req.body;
    const customer = await CustomerRepository.resetPassword(
      cusId,
      password,
      resetString
    );
    if (customer?.error) {
      res.status(404).json({
        error: true,
        message: customer?.message,
      });
    } else {
      res.status(200).json({
        error: false,
        message: "Cập nhật thành công!",
      });
    }
  } catch (err) {
    throw err;
  }
};

const forgetpassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    const customer = await CustomerRepository.sendEmailToResetPassword(
      data?.email,
      data?.redirectUri
    );
    if (customer?.error) {
      res.status(404).json({
        error: true,
        message: customer?.message,
      });
    }
    res.status(200).json({
      error: false,
      data: customer,
    });
  } catch (err) {
    throw err;
  }
};

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const cusId = session?.user.id;
    const { oldPassword, newPassword } = req.body;    
    const customer = await CustomerRepository.changePassword(
      cusId,
      oldPassword,
      newPassword
    );
    if (customer?.error) {
      res.status(404).json({
        error: true,
        message: customer?.message,
      });
    } else {
      res.status(200).json({
        error: false,
        message: "Cập nhật thành công!",
      });
    }
  } catch (err) {
    throw err;
  }
};
export {
  changePassword, forgetpassword, getAllCustomers,
  getCustomerById, login, register, resetPassword, updateInfo
};

