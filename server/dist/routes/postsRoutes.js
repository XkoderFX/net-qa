"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = express_1.Router();
/*
 * METHOD: GET
 * URI: /api/categories
 * get all categories
 */
router.route("/").get(postController_1.getCategories);
/*
 * METHOD: POST
 * URI: /api/categories
 * creating new category
 */
router.route("/").post(postController_1.createCategory);
/*
 * METHOD: POST
 * URI: /api/categories/:categoryName
 * creating new article
 */
router.route("/:categoryName").post(postController_1.createArticle);
exports.default = router;
