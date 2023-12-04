"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const connectDB_1 = require("./connectDB");
const fs_1 = __importDefault(require("fs"));
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const start = async () => {
    try {
        await (0, connectDB_1.initDB)();
        console.log("connect db successful!!!");
    }
    catch (error) {
        console.log("connect db failed!!!");
        console.log(error);
    }
    const httpsOptions = {
        key: fs_1.default.readFileSync("./https_cert/localhost-key.pem"),
        cert: fs_1.default.readFileSync("./https_cert/localhost.pem")
    };
    const app = (0, next_1.default)({ dev });
    const handle = app.getRequestHandler();
    app.prepare().then(() => {
        (0, https_1.createServer)(httpsOptions, (req, res) => {
            const parsedUrl = (0, url_1.parse)(req.url, true);
            handle(req, res, parsedUrl);
        }).listen(port);
        console.log(`> Server listening at https://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
    });
};
start();
