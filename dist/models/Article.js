"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BaseModel_1 = require("./BaseModel");
const Author_1 = require("./Author");
const ArticleAuthor_1 = require("./ArticleAuthor");
let Article = class Article extends BaseModel_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Article.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Article.prototype, "abstract", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE })
], Article.prototype, "publish_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Article.prototype, "journal_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Article.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Author_1.Author, {
        through: () => ArticleAuthor_1.ArticleAuthor
    })
], Article.prototype, "author", void 0);
Article = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "articles",
    })
], Article);
exports.Article = Article;
