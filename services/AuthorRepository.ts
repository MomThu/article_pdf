import { QueryTypes } from "sequelize";
import { Author } from "../connectDB";

export class AuthorRepository extends Author {
  public static getAllAuthor = async () => {
    const datas = await Author.findAll();
    return datas;
  };

  public static searchAuthor = async (keyword?: string | string[]) => {
    const datas = await Author.findAll({
      where: {
        title: `%${keyword}%`,
      },
    });
    return datas;
  };

  public static getAuthorByArticle = async (articleId: string | string[]) => {
    const authors = await this.sequelize.query(
      `SELECT * FROM article_author JOIN authors ON article_author.author_id = authors.id WHERE article_author.article_id = ${articleId}`,
      { type: QueryTypes.SELECT }
    );
    return authors;
  };

  public static addAuthor = async (author: any) => {
    const checkExist = await Author.findOne({
      where: {
        email: author?.email,
      },
    });
    if (checkExist) {
      return {
        error: true,
        message: "Author is already exist!",
      };
    } else {
      try {
        const authorCreated = Author.create({
          ...author,
        });
        return {
          error: true,
          data: authorCreated,
        }
      } catch (err) {
        return {
          error: true,
          message: "Create Failed!",
        };
      }
    }
  };
}
