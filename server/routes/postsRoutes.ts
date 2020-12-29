import { Router } from "express";
import { authCheck } from "../controllers/authController";
import {
    createArticle,
    createCategory,
    getCategories,
} from "../controllers/postController";

const router = Router();

/*
 * METHOD: GET
 * URI: /api/categories
 * get all categories
 */

router.route("/").get(getCategories);

/*
 * METHOD: POST
 * URI: /api/categories
 * creating new category
 */

router.route("/").post(createCategory);

/*
 * METHOD: POST
 * URI: /api/categories/:categoryName
 * creating new article
 */

router.route("/:categoryName").post(createArticle);

export default router;
