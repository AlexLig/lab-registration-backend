import express, { Request, Response, NextFunction } from 'express';
import { trim } from '../middlewares/trim';
import { validateReq } from '../middlewares/validateReq';
import { LabClassDto } from './dto';
import { createLabClass } from './services';

export const router = express.Router();

router
  .route('/')
  .get()
  .post(trim('body'), validateReq(LabClassDto), async (req, res, next) => {
    try {
      const labClass = await createLabClass(req.body);
      res.send(labClass);
    } catch (error) {
      next(error);
    }
  });
router
  .route('/:id')
  .get()
  .put()
  .delete();
