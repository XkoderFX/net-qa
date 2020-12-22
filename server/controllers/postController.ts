import { NextFunction, Request, Response } from 'express';
import Post from '../models/postModel';
import AppError from '../utils/appError';

interface PostIn {
  category: string;
  body: string;
}

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, body } = req.body as PostIn;
  console.log('res.locals: ', res.locals.user);

  const newPost = await Post.create({
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
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const post = await Post.findById(req.params.id).populate('userID');

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!post) {
    next(new AppError('No document found with this id'));
  }
  res.status(204).json({
    status: 'success',
  });
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await Post.find({});

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
};
