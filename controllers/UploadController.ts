import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { get, toNumber } from "lodash";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import {IncomingForm} from "formidable";
import axios from "axios";
import FormData from "form-data";


const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
  
      form.parse(req, (err, fields, files) => {
        if (err) reject({ err })
        resolve({ err, fields, files })
      }) 
    })
    const form = new FormData();
    var fs = require("fs");
    form.append('file', fs.createReadStream(data['files'].file[0].filepath))
    const session = await getServerSession(req, res, authOptions);
    const {id, role} = session?.user;
    if (id && role === 1) {
      try {
        const pdfServerUrl = process.env.PDF_SERVER
        const result = await axios.post(pdfServerUrl, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (result && result['error']) {
          res.status(401).json({ 
            error: true,
            message: get(result, "message", "Bạn không có quyền thực hiện chức năng này!"),
          });
        } else {
          res.status(200).json({ 
            error: false,
            data: get(result, "data", ""),
            message: get(result, "message", "Upload thành công!"),
          });
        }
      } catch (err) {
        res.status(500).json({ 
          error: true,
          message: "Upload thất bại!",
        });
      }
    } else {
      res.status(401).json({
        error: false,
        message: "Bạn không có quyền thực hiện chức năng này!",
      });
    }
  } catch (err) {
    throw err;
  }
};

export { uploadFile };
