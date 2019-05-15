import express, { Request, Response, NextFunction } from 'express';
import {
  getAllCourses,
  createCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById,
} from './services';
import { trim } from '../middlewares/trim';
import { validateReq } from '../middlewares/validateReq';
import { CourseDto } from './dto';

export const router = express.Router();

router
  .route('/')

  .get(async (req, res, next) => {
    try {
      const courses = await getAllCourses();
      res.send(courses);
    } catch (error) {
      next(error);
    }
  })

  .post(trim('body'), validateReq(CourseDto), async (req, res, next) => {
    try {
      const course = await createCourse(req.body);
      res.send(course);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')

  .get(async (req, res, next) => {
    try {
      const course = getCourseById(req.params.id);
      res.send(course);
    } catch (error) {
      next(error);
    }
  })

  .put(trim('body'), validateReq(CourseDto), async (req, res, next) => {
    try {
      const course = updateCourseById(req.params.id, req.body);
      res.send(course);
    } catch (error) {
      next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const deleteResult = deleteCourseById(req.params.id);
      res.send(deleteResult);
    } catch (error) {
      next(error);
    }
  });
