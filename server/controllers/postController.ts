import { NextFunction, Request, Response } from "express";
import Article, { IArticle } from "../models/Article";
import Category from "../models/postModel";
import AppError from "../utils/appError";

/*
 * METHOD: GET
 * URI: /api/categories
 * get all categories
 */

export const getCategories = async (req: Request, res: Response) => {
    res.status(201).json(await Category.find({}));
};

/*
 * METHOD: POST
 * URI: /api/categories
 * creating new category
 * BODY: {categoryName: string, posts: [{id, name, body, category, userId }]}
 */

export const createCategory = async (req: Request, res: Response) => {
    const {
        categoryName,
        posts,
    }: { categoryName: string; posts: IArticle[] } = req.body;

    const category = new Category({
        category: categoryName,
        articles: posts,
    });

    await category.save();

    res.status(201).json(category);
};

/*
 * METHOD: POST
 * URI: /api/categories/:categoryName
 * creating new article
 * PATH PARAMS: categoryName
 * BODY: {name, body, userId}
 */

export const createArticle = async (req: Request, res: Response) => {
    const {
        name,
        body,
        userId,
    }: {
        name: string;
        body: string;
        userId: string;
    } = req.body;
    const categoryName = req.params.categoryName;

    const category = await Category.findOne({ category: categoryName });

    const article = new Article({
        name,
        category: categoryName,
        body,
        userId,
    });

    if (category) {
        category?.articles.push(article);
        await category?.save();
        res.status(201).json(category);
    } else {
        const category = new Category({
            category: categoryName,
            articles: [article],
        });
        await category?.save();
        res.status(201).json(category);
    }
};
