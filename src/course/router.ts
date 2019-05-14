import express, { Request, Response, NextFunction } from 'express';
import { Course, validateCourse } from './model';

export const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    // Get all courses from db and sort them by name property
    const courses = await Course.find().sort('name');
    res.send(courses);
  })
  .post(async (req, res) => {
    // Check if the request's body is valid.
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = await Course.findOne({ name: req.body.name });
    if (course) return res.status(400).send('Course already exist.');
  });
router
  .route('/:id')
  .get(async (req, res) => {
    const course = Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course with the given id was not found');
    res.send(course);
  })
  .put()
  .delete();
