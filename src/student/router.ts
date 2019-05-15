import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { createStudent } from './services';
import { trim } from '../middlewares/trim';
import { validateReq } from '../middlewares/validateReq';
import { StudentDto } from './dto';

export const router = express.Router();

router.route('/').post(trim('body'), validateReq(StudentDto), async (req, res, next) => {
  try {
    const student = await createStudent(req.body);
    return res.send(student);
  } catch (error) {
    next(error);
  }
});
