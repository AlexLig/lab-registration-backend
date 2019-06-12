import express, { Request, Response, NextFunction } from 'express';
import { validateUser } from '../services/validateUser';
import { removeProps } from '../utils/objectManipulation';
import { trim } from '../middlewares/trim';
import { validateReq } from '../middlewares/validateReq';
import { LoginDto } from '../dtos/loginDto';

export const loginRouter = express.Router();

loginRouter
  .route('/')
  .post(trim('body'), validateReq(LoginDto), async (req, res, next) => {
    try {
      const user = await validateUser(req.body);
      return res.send(removeProps(user, 'password'));
    } catch (error) {
      next(error);
    }
  });
