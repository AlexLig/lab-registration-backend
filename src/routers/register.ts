import express from 'express';
import { validateReq } from '../middlewares/validateReq';
import { trim } from '../middlewares/trim';
import { StudentDto } from '../student/dto';
import { createStudentUser } from '../services/createStudentUser';
import { removeProps } from '../utils/objectManipulation';
import { generateAuthToken } from '../auth/generateToken';

export const registerRouter = express.Router();

registerRouter
  .route('/student')
  .post(trim('body'), validateReq(StudentDto), async (req, res, next) => {
    try {
      const studentUser = await createStudentUser(req.body);
      const token = generateAuthToken({
        id: studentUser.id,
        isAdmin: studentUser.isAdmin,
      });
      return res
        .header('x-auth-token', token)
        .send(removeProps(studentUser, 'password'));
    } catch (error) {
      next(error);
    }
  });

registerRouter.route('/teacher').post(async () => {});
