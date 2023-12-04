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
exports.ArticlePermission = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BaseModel_1 = require("./BaseModel");
const Article_1 = require("./Article");
const Customer_1 = __importDefault(require("./Customer"));
let ArticlePermission = class ArticlePermission extends BaseModel_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Article_1.Article),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], ArticlePermission.prototype, "article_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Article_1.Article)
], ArticlePermission.prototype, "article", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Customer_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], ArticlePermission.prototype, "customer_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Customer_1.default)
], ArticlePermission.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], ArticlePermission.prototype, "type_of_permission", void 0);
ArticlePermission = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "article_permission",
    })
], ArticlePermission);
exports.ArticlePermission = ArticlePermission;
