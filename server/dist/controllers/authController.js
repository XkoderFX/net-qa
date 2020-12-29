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
exports.authCheck = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const changePasswordAfter = (jwtTimestamp, user) => {
    // console.log(new Date(user.updatedAt!).getTime() / 1000);
    // console.log(jwtTimestamp);
    const updatedDate = new Date(user.updatedAt).getTime() / 1000;
    return jwtTimestamp < updatedDate;
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
                id: user._id,
            },
        },
    });
};
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const encryptPass = yield bcryptjs_1.default.hash(password.toString(), 12);
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
const correctPassword = (sentPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(sentPassword, userPassword);
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const password = req.body.password.toString();
        if (!email || !password) {
            return next(new appError_1.default('Please provide email and password'));
        }
        const user = yield usersModel_1.default.findOne({ email }).select('+password');
        if (!user || !(yield correctPassword(password, user.password))) {
            return next(new appError_1.default('Incorrect email or password'));
        }
        createSendToken(user, 200, req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in!'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const currentUser = yield usersModel_1.default.findById(decoded.id);
        if (!currentUser) {
            return next(new appError_1.default('The user belonging to this token does no longer exist'));
        }
        if (changePasswordAfter(decoded.exp, currentUser)) {
            return next(new appError_1.default('User recently changed password! please login again'));
        }
        res.locals.user = currentUser;
        next();
    }
    catch (error) {
        return next(new appError_1.default(error.message));
    }
});
exports.authCheck = authCheck;
