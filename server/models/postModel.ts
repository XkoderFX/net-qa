import mongoose, { Schema, Document, Types } from "mongoose";
import Article, { ArticleSchema, IArticle } from "./Article";

export interface ICategory extends Document {
    id: string;
    category: string;
    articles: IArticle[];
}

export const CategorySchema = new Schema<ICategory>({
    category: {
        type: String,
        required: true,
    },
    articles: {
        default: [],
        type: [ArticleSchema],
    },
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
