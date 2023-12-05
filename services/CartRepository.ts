import { QueryTypes } from "sequelize";
import { Cart } from "../connectDB";

export class CartRepository extends Cart {
  public static getCartsByCusId = async (cusId: number) => {
    const carts = await this.sequelize.query(
      `SELECT * FROM carts JOIN articles ON carts.article_id = articles.id WHERE carts.customer_id = ${cusId}`,
      { type: QueryTypes.SELECT }
    );
    return carts;
  };

  public static addToCart = async (cusId: number, articleId: number) => {
    try {
      const checkExist = await Cart.findOne({
        where: {
          customer_id: cusId,
          article_id: articleId,
        },
      });
      if (checkExist) {
        return {
          error: true,
          message: "Bài báo này đã có trong giỏ hàng!",
        };
      }
      const customer = await Cart.create({
        customer_id: cusId,
        article_id: articleId,
        date: new Date()
      });
      return {
        error: false,
        message: "Thêm vào giỏ hàng thành công!",
      };
    } catch (err) {
      return {
        error: true,
        message: "Thêm vào giỏ hàng thất bại!",
      };
    }
  };
}
