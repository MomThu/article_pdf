import { get, size, toNumber } from "lodash";
import { QueryTypes } from "sequelize";
import { Pdf } from "../connectDB";
import crypto from "crypto";
export class PdfRepository extends Pdf {
  public static getPdfByArticle = async (
    articleId: string | string[],
    cusId: number,
    privateKey: string,
    iv_value: string
  ) => {
    const encrypt = (text, key, iv) => {
      let cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(key),
        Buffer.from(iv, "hex")
      );
      let encrypted = cipher.update(text, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    };
    const permissions = await this.sequelize.query(
      `SELECT type_of_permission FROM article_permission WHERE article_permission.article_id = ${articleId} AND article_permission.customer_id = ${cusId}`,
      { type: QueryTypes.SELECT }
    );
    const pdf = await Pdf.findOne({
      where: {
        article_id: toNumber(articleId),
      },
    });
    const realPassword = pdf.password;
    const encryptedPassword = encrypt(realPassword, privateKey, iv_value);
    const permission = get(permissions[0], 'type_of_permission', 0);
    return {
      encryptedPassword: encryptedPassword,
      permission: permission,
    };
  };
}

// cho nay sua model chuyen tu 1-n sang 1-1
