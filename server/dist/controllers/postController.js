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
exports.getAllPosts = exports.updatePost = exports.getPost = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, body } = req.body;
    console.log('res.locals: ', res.locals.user);
    const newPost = yield postModel_1.default.create({
        userID: res.locals.user._id,
        category,
        body,
    });
    res.status(201).json({
        status: 'success',
        data: {
            post: newPost,
        },
    });
});
exports.createPost = createPost;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id).populate('userID');
    res.status(200).json({
        status: 'success',
        data: {
            post,
        },
    });
});
exports.getPost = getPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!post) {
        next(new appError_1.default('No document found with this id'));
    }
    res.status(204).json({
        status: 'success',
    });
});
exports.updatePost = updatePost;
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postModel_1.default.find({});
    res.status(200).json({
        status: 'success',
        data: {
            posts,
        },
    });
});
exports.getAllPosts = getAllPosts;
