import jwt, { sign } from 'jsonwebtoken';
import { promisify } from 'util';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import User from '../models/usersModel';
import AppError from '../utils/appError';

interface UserIn {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: UserIn,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id!);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = (req.body as UserIn)!;
  const encryptPass = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      name,
      email,
      role: 'user',
      password: encryptPass,
    });

    createSendToken(newUser, 201, req, res);
  } catch (error) {
    return res.status(400).send({
      err: error.message,
    });
  }
};

const correctPassword = async (sentPassword: string, userPassword: string) => {
  return await bcrypt.compare(sentPassword, userPassword);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password'));
    }

    const user = await User.findOne({ email }).select('+password');

    const passwordCorrect = await correctPassword(password, user!.password);
    console.log(passwordCorrect);

    if (!user || !(await correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password'));
    }

    createSendToken(user!, 200, req, res);
  } catch (error) {
    next(error);
  }
};
