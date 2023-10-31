import { createRouter, expressWrapper } from "next-connect";
import onError from "../../../middleware/errors";
import {
  getAllArticles,
  searchArticle,
} from "../../../controllers/ArticleController";
import { NextApiRequest, NextApiResponse } from "next";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.get(getAllArticles);

const handler = router.handler({
  onError: onError,
});

export default handler;
