import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { OrderRepository } from "../services";
import { toNumber } from "lodash";

const getAllOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let cusId = 1;
    let result = await OrderRepository.getOrdersByCusId(cusId);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (err) {
    throw err;
  }
};

const getOrderById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let orderId = req.query.id;
    let data = await OrderRepository.findByPk(toNumber(orderId));
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

const getArticlesByOrder = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    let { order } = req.query;
    let data = await OrderRepository.getArticlesByOrder(toNumber(order));
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

export { getAllOrders, getOrderById, getArticlesByOrder };
