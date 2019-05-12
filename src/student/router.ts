import express, { Request, Response, NextFunction } from 'express';
import { validateStudent, Student } from './model';
import bcrypt from 'bcrypt';

export const router = express.Router();

router.route('/').post(async (req, res) => {
  // Check if the body of the request is valid.
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the student is already registered.
  const registeredStudent = await Student.findOne({ AM: req.body.AM });
  if (registeredStudent) return res.status(400).send('Student already registered');

  // Pick only the desired properties to avoid non related data.
  const { name, surname, AM, email, password } = req.body;

  // Generate salt and hash the student's password so we can save it to db.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save student to db.
  const student = new Student({ name, surname, AM, email, password: hashedPassword });
  await student.save();

  // TODO: Generate auth token and embed it to response.
  // TODO: res.send only specific properties of student.
  res.send(student);
});
router
  .route('/me')
  .get(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {});
