import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { CustomerRepository } from "../services";
import { toNumber } from "lodash";

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
      password: data?.password
    });
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

const login = async (req: NextApiRequest, res: NextApiResponse) => {  
  try {
    const data = req.body;
    const customer = await CustomerRepository.login({
      email: data?.email,
      password: data?.password
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
    const customer = await CustomerRepository.addCustomer({
      email: data?.email,
      full_name: data?.full_name,
      phone: data?.phone,
    });
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

export { getAllCustomers, getCustomerById, register, updateInfo, login };
