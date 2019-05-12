import mongoose from 'mongoose';
import Joi from 'joi';
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  AM: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});

const validationSchema = {
  name: Joi.string()
    .required()
    .min(2)
    .max(255),

  surname: Joi.string()
    .required()
    .min(2)
    .max(255),

  AM: Joi.string()
    .required()
    .min(3)
    .max(20),

  email: Joi.string()
    .required()
    .email()
    .min(5)
    .max(255),

  password: Joi.string()
    .min(5)
    .max(255)
    .required(),
};

export const Student = mongoose.model('Student', studentSchema);
export const validateStudent = (student: any) => Joi.validate(student, validationSchema);
