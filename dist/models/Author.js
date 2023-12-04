"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Article_1 = require("./Article");
const ArticleAuthor_1 = require("./ArticleAuthor");
const BaseModel_1 = require("./BaseModel");
let Author = class Author extends BaseModel_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Author.prototype, "fullname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Author.prototype, "department", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Author.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Author.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Article_1.Article, {
        through: () => ArticleAuthor_1.ArticleAuthor
    })
], Author.prototype, "article", void 0);
Author = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "authors",
    })
], Author);
exports.Author = Author;
