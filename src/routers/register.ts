import express, { Request, Response, NextFunction } from 'express';
import { validateReq } from '../middlewares/validateReq';
import { trim } from '../middlewares/trim';
import { StudentDto } from '../student/dto';
import { getRepository } from 'typeorm';
import { User } from '../user/entity';
import { Student } from '../student/entity';
import { createStudentUser } from '../services/createStudentUser';

export const registerRouter = express.Router();

registerRouter
  .route('/student')
  .post(trim('body'), validateReq(StudentDto), async (req, res, next) => {
    try {
      const student = await createStudentUser(req.body);
      return res.send(student);
    } catch (error) {
      next(error);
    }
  });

registerRouter.route('/teacher').post(async (req, res, next) => {});
