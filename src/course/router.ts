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

    // Check if course already exist. If so return.
    const existingCourse = await Course.findOne({ name: req.body.name });
    if (existingCourse) return res.status(400).send('Course already exist.');

    const course = new Course({
      name: req.body.name,
    });

    const savedCourse = await course.save();
    res.send(savedCourse);
  });

router
  .route('/:id')

  .get(async (req, res) => {
    const course = Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course with the given id was not found');
    res.send(course);
  })

  .put(async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = Course.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true },
    );
    if (!course) return res.status(404).send('Course with the given id was not found.');
    res.send(course);
  })

  .delete(async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) return res.status(404).send('Course with the given id was not found');
    res.send(course);
  });
