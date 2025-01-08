import jwt, { JwtPayload } from 'jsonwebtoken';

import {User} from '../models/user.models.js';
import {ApiError} from '../utils/index.js';
import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  message: string;
}

export default async (req:any, res:Response, next:NextFunction) => {
  const token =
    req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'Access Denied.', [], '', undefined);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken -__v'
    );
    req.user = user;

    next();
  } catch (error) {
    const customError = error as CustomError;
    throw new ApiError(
      401,
      customError?.message || 'Invalid access token',
      [],
      '',
      undefined
    );
  }
};
