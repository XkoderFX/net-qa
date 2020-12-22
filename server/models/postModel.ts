import mongoose, { Schema, Document } from 'mongoose';
const { ObjectId } = Schema.Types;

interface PostIn extends Document {
  userID: string;
  category: string;
  body: string;
}

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userID: {
      type: ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostIn>('Posts', postSchema);
export default Post;
