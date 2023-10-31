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
}
