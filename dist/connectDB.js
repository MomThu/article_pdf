"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.Reference = exports.Pdf = exports.Cart = exports.Author = exports.ArticlePermission = exports.ArticleAuthor = exports.Article = exports.Order = exports.Customer = void 0;
const Article_1 = require("./models/Article");
Object.defineProperty(exports, "Article", { enumerable: true, get: function () { return Article_1.Article; } });
const sequelize_typescript_1 = require("sequelize-typescript");
const envConfig_1 = __importDefault(require("./config/envConfig"));
// import { Customer } from "./models/Customer";
const Customer_1 = __importDefault(require("./models/Customer"));
exports.Customer = Customer_1.default;
const Order_1 = require("./models/Order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return Order_1.Order; } });
const ArticleAuthor_1 = require("./models/ArticleAuthor");
Object.defineProperty(exports, "ArticleAuthor", { enumerable: true, get: function () { return ArticleAuthor_1.ArticleAuthor; } });
const ArticlePermission_1 = require("./models/ArticlePermission");
Object.defineProperty(exports, "ArticlePermission", { enumerable: true, get: function () { return ArticlePermission_1.ArticlePermission; } });
const Author_1 = require("./models/Author");
Object.defineProperty(exports, "Author", { enumerable: true, get: function () { return Author_1.Author; } });
const Cart_1 = require("./models/Cart");
Object.defineProperty(exports, "Cart", { enumerable: true, get: function () { return Cart_1.Cart; } });
const Pdf_1 = require("./models/Pdf");
Object.defineProperty(exports, "Pdf", { enumerable: true, get: function () { return Pdf_1.Pdf; } });
const Reference_1 = require("./models/Reference");
Object.defineProperty(exports, "Reference", { enumerable: true, get: function () { return Reference_1.Reference; } });
const sequelize = new sequelize_typescript_1.Sequelize({
    host: envConfig_1.default.DATABASE_HOST,
    database: envConfig_1.default.DATABASE_NAME,
    dialect: "mysql",
    username: envConfig_1.default.DATABASE_USER,
    password: envConfig_1.default.DATABASE_PASSWORD,
});
sequelize.addModels([
    Customer_1.default,
    Order_1.Order,
    Article_1.Article,
    ArticleAuthor_1.ArticleAuthor,
    ArticlePermission_1.ArticlePermission,
    Author_1.Author,
    Cart_1.Cart,
    Pdf_1.Pdf,
    Reference_1.Reference,
]);
const initDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
};
exports.initDB = initDB;
