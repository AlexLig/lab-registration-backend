import { getRepository } from 'typeorm';
import { Course } from '../course/entity';

export async function getCourseLabs(id: number) {
  const courseRepo = getRepository(Course);
  const course = await courseRepo.findOne(id, { relations: ['labClasses'] });
  if (course) return course.labClasses;
}
