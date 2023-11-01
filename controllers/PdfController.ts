import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { PdfRepository } from "../services";
import { toNumber } from "lodash";
import crypto from "crypto";

const getPdfByArticle = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const privateKey = "123456";
//     const iv_value = crypto.randomBytes(16).toString("hex");
//     const articleId = req.query.article;
//     let result = await PdfRepository.getPdfByArticle(articleId, cusIs, privateKey, iv_value);
//     res.status(200).json({
//       error: false,
//       data: result,
//     });
//   } catch (err) {
//     throw err;
//   }
};

export { getPdfByArticle };
