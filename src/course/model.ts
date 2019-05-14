import mongoose from 'mongoose';
import Joi from 'joi';
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const validationSchema = {
  name: Joi.string()
    .required()
    .min(2)
    .max(255),
};

export const Course = mongoose.model('Course', courseSchema);
export const validateCourse = (course: any) => Joi.validate(course, validationSchema);
