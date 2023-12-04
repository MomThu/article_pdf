"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    DATABASE_HOST: process.env.DATABASE_HOST || "",
    DATABASE_PORT: process.env.DATABASE_PORT || "",
    DATABASE_USER: process.env.DATABASE_USER || "",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "",
    DATABASE_NAME: process.env.DATABASE_NAME || "",
};
