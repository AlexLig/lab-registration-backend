import express, { Request, Response, NextFunction } from 'express';
import { trim } from '../middlewares/trim';
import { validateReq } from '../middlewares/validateReq';
import { LabClassDto } from './dto';
import { createLabClass, getAllLabClass } from './services';
import { registerStudentToLab } from '../services/registerStudentToLab';

export const labClassRouter = express.Router();

labClassRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const labClasses = await getAllLabClass();
      res.send(labClasses);
    } catch (error) {
      next(error);
    }
  })
  .post(trim('body'), validateReq(LabClassDto), async (req, res, next) => {
    try {
      const labClass = await createLabClass(req.body);
      res.send(labClass);
    } catch (error) {
      next(error);
    }
  });

labClassRouter.route('/register/:labClassID/:studentID').post(async (req, res, next) => {
  try {
    const result = await registerStudentToLab(
      req.params.labClassID,
      req.params.studentID,
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
});
