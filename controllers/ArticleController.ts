import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticleRepository } from "../services";
import { toNumber } from "lodash";
import crypto from "crypto";

const getAllArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result = await ArticleRepository.getAllArticle();
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (err) {
    throw err;
  }
};

const getArticleById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const articleId = req.query.id;
    let data = await ArticleRepository.findByPk(toNumber(articleId));
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

const searchArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const keyword = req.query.keyword;
    let data = await ArticleRepository.searchArticle(keyword);
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

const getArticleByAuthor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    let { author } = req.query;
    let data = await ArticleRepository.getArticleByAuthor(author);
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

const getPermissionArticle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const privateKey = "123456";
    const iv_value = crypto.randomBytes(16).toString("hex");
    let { article } = req.query;
    let cusId = 5;
    let data = await ArticleRepository.getPermissionArticle(cusId, article, privateKey, iv_value);
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

const getArticleByPermission = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    let { permission } = req.query;
    let cusId = 5;
    let data = await ArticleRepository.getArticleByPermission(
      cusId,
      permission
    );
    res.status(200).json({
      error: false,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};
export {
  getAllArticles,
  getArticleById,
  searchArticle,
  getArticleByAuthor,
  getPermissionArticle,
  getArticleByPermission,
};
