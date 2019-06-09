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
import { getCourseLabs } from '../services/getCourseLabs';

export const courseRouter = express.Router();

courseRouter
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

courseRouter.route('/:id/labs').get(async (req, res, next) => {
  try {
    const labs = await getCourseLabs(req.params.id);
    res.send(labs);
  } catch (error) {
    next(error);
  }
});

courseRouter
  .route('/:id')

  .get(async (req, res, next) => {
    try {
      const course = await getCourseById(req.params.id);
      res.send(course);
    } catch (error) {
      next(error);
    }
  })

  .put(trim('body'), validateReq(CourseDto), async (req, res, next) => {
    try {
      const course = await updateCourseById(req.params.id, req.body);
      res.send(course);
    } catch (error) {
      next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const deleteResult = await deleteCourseById(req.params.id);
      res.send(deleteResult);
    } catch (error) {
      next(error);
    }
  });
