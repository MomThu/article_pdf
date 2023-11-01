import { FindOptions, QueryTypes } from "sequelize";
import { Article } from "../connectDB";
import { size } from "lodash";
import CryptoJS from "crypto-js";

export class ArticleRepository extends Article {
  public static getAllArticle = async (options?: FindOptions) => {
    const datas = await Article.findAll();
    return datas;
  };

  public static searchArticle = async (keyword?: string | string[]) => {
    const datas = await Article.findAll({
      where: {
        title: `%${keyword}%`,
      },
    });
    return datas;
  };

  public static getArticleByAuthor = async (authorId: string | string[]) => {
    const articles = await this.sequelize.query(
      `SELECT * FROM article_author JOIN articles ON article_author.article_id = articles.id WHERE article_author.author_id = ${authorId}`,
      { type: QueryTypes.SELECT }
    );
    return articles;
  };

  encrypt = async (privateKey: string, iv_value: string) => {
    var Sha256 = CryptoJS.SHA256;
    var Hex = CryptoJS.enc.Hex;
    var Utf8 = CryptoJS.enc.Utf8;
    var Base64 = CryptoJS.enc.Base64;
    var AES = CryptoJS.AES;

    var key = Sha256(privateKey).toString(Hex).substr(0, 32); // Use the first 32 bytes (see 2.)
    var iv = Sha256(iv_value).toString(Hex).substr(0, 16);

    // Encryption
    var output = AES.encrypt("test", Utf8.parse(key), {
      iv: Utf8.parse(iv),
    }).toString(); // First Base64 encoding, by default (see 1.)

    var output2ndB64 = Utf8.parse(output).toString(Base64); // Second Base64 encoding (see 1.)
    console.log(output2ndB64); // MWNjdVlVL1hBWGN2UFlpMG9yMGZBUT09

    // Decryption
    var decrypted = AES.decrypt(output, Utf8.parse(key), {
      iv: Utf8.parse(iv),
    }).toString(Utf8);
    console.log(decrypted); // test
  };

  public static getPermissionArticle = async (
    cusId: number,
    articleId: string | string[],
    privateKey: string,
    iv_value: string
  ) => {
    const permissions = await this.sequelize.query(
      `SELECT * FROM article_permission WHERE article_permission.article_id = ${articleId} AND article_permission.customer_id = ${cusId}`,
      { type: QueryTypes.SELECT }
    );
    // const encrypt = openssl_enc
    let result = {
      permissions: permissions,
      encryptedPassword: 1,
    };
    return permissions;
  };

  public static getArticleByPermission = async (
    cusId: number,
    permission: string | string[]
  ) => {
    const permissions = await this.sequelize.query(
      `SELECT * FROM article_permission JOIN articles ON article_permission.article_id = articles.id WHERE article_permission.type_of_permission = ${permission} AND article_permission.customer_id = ${cusId}`,
      { type: QueryTypes.SELECT }
    );
    return permissions;
  };
}
