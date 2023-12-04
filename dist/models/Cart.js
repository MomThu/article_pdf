"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BaseModel_1 = require("./BaseModel");
const Customer_1 = __importDefault(require("./Customer"));
const Article_1 = require("./Article");
let Cart = class Cart extends BaseModel_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Customer_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Cart.prototype, "customer_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Customer_1.default)
], Cart.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Article_1.Article),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Cart.prototype, "article_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Article_1.Article)
], Cart.prototype, "article", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE })
], Cart.prototype, "date", void 0);
Cart = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "carts",
    })
], Cart);
exports.Cart = Cart;
