"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use('/api/users', usersRoutes_1.default);
exports.default = app;