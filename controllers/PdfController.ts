import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticleRepository, PdfRepository } from "../services";
import { toNumber } from "lodash";
import crypto from "crypto";

const getPdfByArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const privateKey = "12345612345612345612345612345612";
    const iv_value = crypto.randomBytes(16).toString("hex");
    const articleId = req.query.article;
    const cusId = 1;
    let result = await PdfRepository.getPdfByArticle(articleId, cusId, privateKey, iv_value);
    let articleInfo = await ArticleRepository.findByPk(toNumber(articleId));
    result['iv_value'] = iv_value;
    result['article'] = articleInfo;
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (err) {
    throw err;
  }
};

export { getPdfByArticle };
