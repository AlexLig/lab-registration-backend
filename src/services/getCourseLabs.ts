import { getRepository } from 'typeorm';
import { Course } from '../course/entity';
import { HttpError } from '../utils/HttpError';

export async function getCourseLabs(id: number) {
  const courseRepo = getRepository(Course);
  const course = await courseRepo.findOne(id, { relations: ['labClasses'] });
  if (!course) throw new HttpError(404, 'Course with the given id does not exist');
  return course.labClasses;
}
