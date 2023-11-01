import { size, toNumber } from 'lodash';
import { QueryTypes } from "sequelize";
import { Pdf } from "../connectDB";

export class PdfRepository extends Pdf {
  public static getPdfByArticle = async (articleId: string | string[], cusId: number, privateKey: string, iv_value: string) => {
    const permissions = await this.sequelize.query(
      `SELECT * FROM article_permission WHERE article_permission.article_id = ${articleId} AND article_permission.customer_id = ${cusId}`,
      { type: QueryTypes.SELECT }
    );
    if (size(permissions) === 0) {

    } else if (size(permissions) === 1) {

    } else if (size(permissions) === 2) {
      
    }
    const pdf = await Pdf.findOne({
      where: {
        article_id: toNumber(articleId)
      }
    });
    return pdf;
  };
}

// cho nay sua model chuyen tu 1-n sang 1-1