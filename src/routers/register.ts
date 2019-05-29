import express from 'express';
import { validateReq } from '../middlewares/validateReq';
import { trim } from '../middlewares/trim';
import { StudentDto } from '../student/dto';
import { createStudentUser } from '../services/createStudentUser';
import { removeProps } from '../utils/objectManipulation';

export const registerRouter = express.Router();

registerRouter
  .route('/student')
  .post(trim('body'), validateReq(StudentDto), async (req, res, next) => {
    try {
      const studentUser = await createStudentUser(req.body);
      return res.send(removeProps(studentUser, 'password'));
    } catch (error) {
      next(error);
    }
  });

registerRouter.route('/teacher').post(async () => {});
