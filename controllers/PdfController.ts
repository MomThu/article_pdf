import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticleRepository, PdfRepository } from "../services";
import { toNumber } from "lodash";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import axios from "axios";

const getPdfByArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const privateKey = session?.id;
    const iv_value = crypto.randomBytes(16).toString("hex");
    const articleId = req.query.article;
    const cusId = session?.user.id;
    if (!cusId) {
      let result = await ArticleRepository.findById(toNumber(articleId))      
      res.status(200).json({
        error: false,
        data: { permission: 0, article: result },
      });
    } else {
      let result = await PdfRepository.getPdfByArticle(
        articleId,
        cusId,
        privateKey,
        iv_value
      );      
      let articleInfo = await ArticleRepository.findById(toNumber(articleId));
      result["iv_value"] = iv_value;
      result["article"] = articleInfo;
      res.status(200).json({
        error: false,
        data: result,
      });
    }
  } catch (err) {
    throw err;
  }
};

const getPdfContentByName = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.query.name;
    const pdfServerUrl = process.env.PDF_SERVER
    const result = await axios.get(`${pdfServerUrl}?key=${name}`);
    res.json(result.data);
  } catch (err) {
    throw err;
  }
};

export { getPdfByArticle, getPdfContentByName };
