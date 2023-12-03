import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {
  searchBoughtArticle
} from "../../../controllers/ArticleController";
import onError from "../../../middleware/errors";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.get(searchBoughtArticle);

const handler = router.handler({
  onError: onError,
});

export default handler;
