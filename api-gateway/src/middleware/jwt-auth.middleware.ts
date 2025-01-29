import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith('/users/login') || req.path.startsWith('/users/register')) {
    return next(); // Allow login and register without auth
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secret-key'); // Replace with env variable in production
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
