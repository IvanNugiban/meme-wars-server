import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  
  const nearId = req.query?.nearId;

  if (!nearId) {
    res.status(400).json({ error: 'Bad Request: nearId is required.' });
  }

  const user = await User.findOne({nearId});

  if (!user) {
    const newUser = new User({nearId})
    newUser.save();
  }

  next();
};

export default userMiddleware;