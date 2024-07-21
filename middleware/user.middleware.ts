import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const userAuth = async (nearId: string) => {

  if (!nearId) {
    throw 'Bad Request: nearId is required.';
  }

  const user = await User.findOne({ nearId });

  if (!user) {
    const newUser = new User({ nearId })
    await newUser.save();
  }
}

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const nearId = req.query?.nearId as string;
    await userAuth(nearId);
  }

  catch (e) {
    res.status(400).json(e);
  }
  next();
};

export default userMiddleware;