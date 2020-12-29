"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const postsRoutes_1 = __importDefault(require("./routes/postsRoutes"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/api/users", usersRoutes_1.default);
app.use("/api/categories", postsRoutes_1.default);
app.use(errorController_1.default);
exports.default = app;
