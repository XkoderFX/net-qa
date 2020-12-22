import jwt, { sign } from 'jsonwebtoken';
import { promisify } from 'util';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import User from '../models/usersModel';

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

  const newUser = await User.create({
    name,
    email,
    role: 'user',
    password: encryptPass,
  });

  createSendToken(newUser, 201, req, res);
};
