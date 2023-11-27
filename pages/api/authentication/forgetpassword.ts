import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {
    forgetpassword,
} from "../../../controllers/CustomerController";
import onError from "../../../middleware/errors";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.post(forgetpassword);

const handler = router.handler({
  onError: onError,
});

export default handler;
