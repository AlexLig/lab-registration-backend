import { getRepository } from 'typeorm';
import { Student } from '../student/entity';
import { HttpError } from '../utils/HttpError';

export async function getStudentLabs(id: number) {
  const studentRepo = getRepository(Student);
  const student = await studentRepo.findOne(id, {
    relations: ['labClasses', 'labClasses.course'],
  });
  if (!student) throw new HttpError(404, 'Student with the given id does not exist');
  return student.labClasses;
}
