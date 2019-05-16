import { CourseDto } from './dto';
import { getRepository, Repository } from 'typeorm';
import { Course } from './entity';
import { HttpError } from '../utils/HttpError';

const getCourseRepository = () => getRepository(Course);

export async function createCourse(dto: CourseDto) {
  const repo = getCourseRepository();

  const existingCourse = await repo.findOne({ where: { name: dto.name } });
  if (existingCourse) throw new HttpError(400, 'Course already exist');

  return repo.save(dto);
}

export async function getAllCourses() {
  return await getCourseRepository().find();
}

export async function getCourseById(id: number) {
  const course = getCourseRepository().findOne(id);
  if (!course) throw new HttpError(404, 'Course with the given id was not found.');
  return course;
}

export async function updateCourseById(id: number, dto: CourseDto) {
  const repo = getCourseRepository();

  const existingCourse = await repo.findOne({ where: { name: dto.name } });
  if (existingCourse && existingCourse.id !== id)
    throw new HttpError(400, 'Course with the given name already exist');

  const course = await repo.findOne(id);
  if (!course) throw new HttpError(404, 'Course with the given id was not found.');

  const updatedCourse: Course = { ...course, ...dto };
  return await repo.save(updatedCourse);
}

export async function deleteCourseById(id: number) {
  const repo = getCourseRepository();
  return await repo.delete({ id });
}
