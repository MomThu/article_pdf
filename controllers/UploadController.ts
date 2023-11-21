import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { toNumber } from "lodash";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import UploadService from "../services/UploadService";

const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const cusId = session?.user.id;
    if (!cusId) {
    //   res.status(200).json({
    //     error: false,
    //     data: { permission: 0 },
    //   });
    let result = await UploadService(req.body);
    } else {
      let result = await UploadService(req.body.file);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { uploadFile };
