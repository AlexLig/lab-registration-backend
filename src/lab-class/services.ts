import { LabClassDto } from './dto';
import { getCourseById } from '../course/services';
import { getRepository } from 'typeorm';
import { LabClass } from './entity';
import { HttpError } from '../utils/HttpError';

const getLabClassRepository = () => getRepository(LabClass);

export async function createLabClass(dto: LabClassDto) {
  const course = await getCourseById(dto.courseId);
  if (!course) throw new HttpError(400, 'Course with the given id was not found.');
  return await getLabClassRepository().save({ ...dto, course });
}

export async function getAllLabClass() {
  const labClasses = await getLabClassRepository().find({ relations: ['course'] });
  return labClasses;
}

export async function getLabClass(id: number) {
  const labClass = await getLabClassRepository().findOne(id, {
    relations: ['course', 'students'],
  });
  return labClass;
}
