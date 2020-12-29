import mongoose, { Schema, Document, Types } from "mongoose";

export interface IArticle extends Document {
    name: string;
    body: string;
    category: string;
    userId: string;
}

export const ArticleSchema = new Schema<IArticle>({
    id: String,
    name: String,
    body: String,
    category: String,
    userId: Schema.Types.ObjectId,
});

const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
