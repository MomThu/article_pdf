import { FindOptions } from 'sequelize';
import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncError from "../middleware/catchAsyncError";
import Customer from "../models/Customer";
import { CustomerRepository } from '../services';

const getAllCustomers = catchAsyncError(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // const addCus = await Customer.create({email: "thumommm10@gmail.com", full_name: "Mom Thu", phone: "113"})
    // console.log(addCus, "add cus res here")
    // console.log(result, "query res here");
    try {
      // const customerr = new Customer({
      //   email: "thumommm10@gmail.com",
      //   full_name: "Mom Thu",
      //   phone: "113",
      // });
      // customerr.save();
      let result = await CustomerRepository.findAllRaw();
      return result
    } catch (err) {
      console.log(err, "err here!!");
    }

    res.status(200).json({
      status: "ok",
      // data: JSON.stringify(result),
      data: "no data",
    });
  }
  // res.status(200).json({
  //   status: "ok",
  //   data: "hh",
  // });
  // }
);

export { getAllCustomers };
