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
  updatedAt?: Date;
}

interface DecodedIn {
  id: string;
  iat: number;
  exp: number;
}

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const changePasswordAfter = (jwtTimestamp: number, user: UserIn) => {
  // console.log(new Date(user.updatedAt!).getTime() / 1000);
  // console.log(jwtTimestamp);
  const updatedDate = new Date(user.updatedAt!).getTime() / 1000;
  return jwtTimestamp < updatedDate;
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
  const encryptPass = await bcrypt.hash(password.toString(), 12);

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
    const { email } = req.body;
    const password = req.body.password.toString();

    if (!email || !password) {
      return next(new AppError('Please provide email and password'));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password'));
    }

    createSendToken(user!, 200, req, res);
  } catch (error) {
    next(error);
  }
};

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in!'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedIn;
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token does no longer exist')
      );
    }

    if (changePasswordAfter(decoded.exp, currentUser)) {
      return next(
        new AppError('User recently changed password! please login again')
      );
    }

    res.locals.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError(error.message));
  }

  // const verifyPromise = promisify(jwt.verify);
};

export const test = (req: Request, res: Response, next: NextFunction) => {
  console.log(res.locals.user);
  res.status(200).json({
    status: 'success',
  });
};
