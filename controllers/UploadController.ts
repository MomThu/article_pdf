import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { get, toNumber } from "lodash";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import UploadService from "../services/UploadService";
import {IncomingForm} from "formidable";


const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
  
      form.parse(req, (err, fields, files) => {
        if (err) reject({ err })
        resolve({ err, fields, files })
      }) 
    })
    const session = await getServerSession(req, res, authOptions);
    const {id, role} = session?.user;
    if (id && role === 1) {
      let result = await UploadService(data.files.file[0], res);      
      if (result?.error) {
        res.status(401).json({ 
          error: true,
          message: get(result, "message", ""),
        });
      } else {
        res.status(200).json({ 
          error: false,
          data: get(result, "data", ""),
          message: get(result, "message", ""),
        });
      }
      
    } else {
      res.status(401).json({
        error: false,
        message: "You are not authorized!",
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { uploadFile };
