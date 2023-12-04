"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleAuthor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BaseModel_1 = require("./BaseModel");
const Author_1 = require("./Author");
const Article_1 = require("./Article");
let ArticleAuthor = class ArticleAuthor extends BaseModel_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Author_1.Author),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], ArticleAuthor.prototype, "author_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Author_1.Author)
], ArticleAuthor.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Article_1.Article),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], ArticleAuthor.prototype, "article_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Article_1.Article)
], ArticleAuthor.prototype, "article", void 0);
ArticleAuthor = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "article_author",
    })
], ArticleAuthor);
exports.ArticleAuthor = ArticleAuthor;
