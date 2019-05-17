import express, { Request, Response, NextFunction } from 'express';
import { trim } from '../middlewares/trim';
import { validateReq } from '../middlewares/validateReq';
import { createUser } from './services';
import { UserDto } from './dto';
import { UserStudentDto } from './dtoUserStudent';
import { createStudent } from '../student/services';

export const userRouter = express.Router();

userRouter
  .route('/')
  .post(trim('body'), validateReq(UserDto), async (req, res, next) => {
    try {
      const student = await createUser(req.body);
      return res.send(student);
    } catch (error) {
      next(error);
    }
  });
userRouter
  .route('/student')
  .post(trim('body'), validateReq(UserStudentDto), async (req, res, next) => {
    try {
      const user = await createUser({
        email: req.body.email,
        password: req.body.password,
      });
      const student = await createStudent({
        name: req.body.name,
        am: req.body.am,
        userId: user.id,
      });

      return res.send(student);
    } catch (error) {
      next(error);
    }
  });
