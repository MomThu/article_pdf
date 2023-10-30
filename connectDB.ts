import { Article } from "./models/Article";
import { Sequelize } from "sequelize-typescript";
import config from "./config/envConfig";
// import { Customer } from "./models/Customer";
import Customer from "./models/Customer";
import { Order } from "./models/Order";
import { ArticleAuthor } from "./models/ArticleAuthor";
import { ArticlePermission } from "./models/ArticlePermission";
import { Author } from "./models/Author";
import { Cart } from "./models/Cart";
import { OrderDetail } from "./models/OrderDetail";
import { Pdf } from "./models/Pdf";
import { Reference } from "./models/Reference";

const sequelize = new Sequelize({
  host: config.DATABASE_HOST,
  database: config.DATABASE_NAME,
  dialect: "mysql",
  username: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  // models: [Customer]
});

sequelize.addModels([
  Customer,
  Order,
  Article,
  ArticleAuthor,
  ArticlePermission,
  Author,
  Cart,
  OrderDetail,
  Pdf,
  Reference,
]);

export { Customer, Order };

export const initDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  //   await User.findOrCreate({
  //     where: { email: "admin@example.com" },
  //     defaults: { name: "admin", email: "admin@example.com" },
  //   });
};
