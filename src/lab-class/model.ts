import mongoose from 'mongoose';
import Joi from 'joi';
const labClassSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  dayISO: {
    type: Number,
    required: true,
    trim: true,
  },
  startHour: {
    type: Date,
    required: true,
    trim: true,
  },
  finishHour: {
    type: Date,
    trim: true,
    required: true,
  },
});

const validationSchema = {
  courseID: Joi.string()
    .required()
    .min(2)
    .max(255),

  dayISO: Joi.number()
    .required()
    .min(1)
    .max(7),

  startHour: Joi.date().required(),

  finishHour: Joi.date().required(),
};

export const LabClass = mongoose.model('LabClass', labClassSchema);
export const validateLabClass = (lab: any) => Joi.validate(lab, validationSchema);
