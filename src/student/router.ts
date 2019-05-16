import express, { Request, Response, NextFunction } from 'express';
import { createStudent, getAllStudents } from './services';
import { trim } from '../middlewares/trim';
import { validateReq } from '../middlewares/validateReq';
import { StudentDto } from './dto';

export const studentRouter = express.Router();

studentRouter
  .route('/')
  .post(trim('body'), validateReq(StudentDto), async (req, res, next) => {
    try {
      const student = await createStudent(req.body);
      return res.send(student);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    try {
      const students = await getAllStudents();
      res.send(students);
    } catch (error) {
      next(error);
    }
  });
