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
exports.createArticle = exports.createCategory = exports.getCategories = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const postModel_1 = __importDefault(require("../models/postModel"));
/*
 * METHOD: GET
 * URI: /api/categories
 * get all categories
 */
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).json(yield postModel_1.default.find({}));
});
exports.getCategories = getCategories;
/*
 * METHOD: POST
 * URI: /api/categories
 * creating new category
 * BODY: {categoryName: string, posts: [{id, name, body, category, userId }]}
 */
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, posts, } = req.body;
    const category = new postModel_1.default({
        category: categoryName,
        articles: posts,
    });
    yield category.save();
    res.status(201).json(category);
});
exports.createCategory = createCategory;
/*
 * METHOD: POST
 * URI: /api/categories/:categoryName
 * creating new article
 * PATH PARAMS: categoryName
 * BODY: {name, body, userId}
 */
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, body, userId, } = req.body;
    const categoryName = req.params.categoryName;
    const category = yield postModel_1.default.findOne({ category: categoryName });
    const article = new Article_1.default({
        name,
        category: categoryName,
        body,
        userId,
    });
    if (category) {
        category === null || category === void 0 ? void 0 : category.articles.push(article);
        yield (category === null || category === void 0 ? void 0 : category.save());
        res.status(201).json(category);
    }
    else {
        const category = new postModel_1.default({
            category: categoryName,
            articles: [article],
        });
        yield (category === null || category === void 0 ? void 0 : category.save());
        res.status(201).json(category);
    }
});
exports.createArticle = createArticle;
