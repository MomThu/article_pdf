import { FindOptions, QueryTypes, Op } from "sequelize";
import {
  Article,
  ArticleAuthor,
  ArticlePermission,
  Author,
  Pdf,
} from "../connectDB";
import { size } from "lodash";

export class ArticleRepository extends Article {
  public static getAllArticle = async (options?: FindOptions) => {
    const datas = await Article.findAll({
      include: [
        {
          model: Author,
          through: { attributes: [] },
          // attributes: [""]
        },
      ],
    });
    return datas;
  };

  public static findById = async (id: number) => {
    const datas = await Article.findByPk();
    const authors = await this.sequelize.query(
      `SELECT * FROM article_author JOIN authors ON article_author.author_id = authors.id WHERE article_author.article_id = ${id}`,
      { type: QueryTypes.SELECT }
    );
    return {
      ...datas,
      authors: authors,
    };
  };

  public static searchArticle = async (keyword?: string | string[]) => {
    if (!keyword || !size(keyword)) {
      const datas = await Article.findAll();
      return datas;
    }
    const dataByTitle = await Article.findAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
      },
    });
    const dataByAbstract = await Article.findAll({
      where: {
        abstract: { [Op.like]: `%${keyword}%` },
      },
    });
    const dataByJournal = await Article.findAll({
      where: {
        journal_name: { [Op.like]: `%${keyword}%` },
      },
    });
    const dataByAuthor: any = await this.sequelize.query(
      `SELECT articles.* FROM authors 
      JOIN article_author ON authors.id = article_author.author_id 
      JOIN articles ON articles.id = article_author.article_id 
      WHERE authors.fullname LIKE '%${keyword}%'`,
      { type: QueryTypes.SELECT }
    );
    const result = dataByTitle
      .concat(dataByAbstract)
      .concat(dataByJournal)
      .concat(dataByAuthor);
    return result;
  };

  public static getArticleByAuthor = async (authorId: string | string[]) => {
    const articles = await this.sequelize.query(
      `SELECT * FROM article_author JOIN articles JOIN authors ON article_author.article_id = articles.id WHERE article_author.author_id = ${authorId}`,
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

  public static getArticleBought = async (cusId: number) => {
    const permissions = await this.sequelize.query(
      `SELECT * FROM article_permission JOIN articles ON article_permission.article_id = articles.id WHERE article_permission.type_of_permission > 0 AND article_permission.customer_id = ${cusId}`,
      { type: QueryTypes.SELECT }
    );
    return permissions;
  };

  public static updateArticlePermission = async (
    cusId: number,
    articleId: number,
    permission: string | string[]
  ) => {
    const articlePermission = await ArticlePermission.findOne({
      where: {
        customer_id: cusId,
        article_id: articleId,
      },
    });
    if (!articlePermission || !size(articlePermission)) {
      const articlePermission = await ArticlePermission.create({
        article_id: articleId,
        customer_id: cusId,
        type_of_permission: Number(permission),
      });
      return articlePermission;
    }
    const updatePermission = await ArticlePermission.update(
      { type_of_permission: Number(permission) },
      {
        where: {
          customer_id: cusId,
          article_id: articleId,
        },
      }
    );
    return updatePermission;
  };

  public static addArticle = async (article: any) => {
    const checkExist = await Article.findOne({
      where: {
        title: article?.title,
      },
    });

    if (!checkExist) {
      const t = await this.sequelize.transaction();
      try {
        const articleCreated = await Article.create(
          {
            title: article?.title,
            abstract: article?.abstract,
            publish_date: article?.publish_date,
            journal_name: article?.journal_name,
          },
          { transaction: t }
        );

        const pdfCreated = await Pdf.create(
          {
            article_id: articleCreated?.id,
            file_name: article?.file_name,
            password: article?.password,
          },
          { transaction: t }
        );

        // for (let i = 0; i < article?.author.length; i++) {
        //   const articleAuthor = await ArticleAuthor.create(
        //     {
        //       article_id: articleCreated?.id,
        //       author_id: article?.author[i],
        //     },
        //     { transaction: t }
        //   );
        // }
          console.log(article, "article");
          
        await Promise.all(article?.author.map(async (id) => {
          try {
            const articleAuthor = await ArticleAuthor.create(
              {
                article_id: articleCreated?.id,
                author_id: id,
              },
              { transaction: t }
            );
          } catch (err) {
            console.log(err, "err here");
          }
          
        }))

        await t.commit();
        return {
          error: false,
          message: "Created Successful!",
        };
      } catch (error) {
        console.log(error, "vao day");
        
        await t.rollback();
        return {
          error: true,
          message: "Create article failed!",
        };
      }
    } else {
      return {
        error: true,
        message: "Article already exist!",
      };
    }
  };
}
