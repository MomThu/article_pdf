import { FindOptions, QueryTypes } from "sequelize";
import { Article } from "../connectDB";
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

  public static getPermissionArticle = async (
    cusId: number,
    articleId: string | string[]
  ) => {
    const permissions = await this.sequelize.query(
      `SELECT * FROM article_permission WHERE article_permission.article_id = ${articleId} AND article_permission.customer_id = ${cusId}`,
      { type: QueryTypes.SELECT }
    );
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
