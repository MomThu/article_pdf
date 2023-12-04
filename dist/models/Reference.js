"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reference = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BaseModel_1 = require("./BaseModel");
const Article_1 = require("./Article");
let Reference = class Reference extends BaseModel_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Article_1.Article),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Reference.prototype, "article_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Article_1.Article)
], Reference.prototype, "article", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Article_1.Article),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Reference.prototype, "cite_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Article_1.Article)
], Reference.prototype, "article2", void 0);
Reference = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "references",
    })
], Reference);
exports.Reference = Reference;
