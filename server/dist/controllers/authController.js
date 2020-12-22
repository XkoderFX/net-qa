"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
};
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const encryptPass = yield bcryptjs_1.default.hash(password, 12);
    try {
        const newUser = yield usersModel_1.default.create({
            name,
            email,
            role: 'user',
            password: encryptPass,
        });
        createSendToken(newUser, 201, req, res);
    }
    catch (error) {
        return res.status(400).send({
            err: error.message,
        });
    }
});
exports.signup = signup;
