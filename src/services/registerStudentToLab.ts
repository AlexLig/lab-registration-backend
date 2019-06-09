import { Student } from '../student/entity';
import { HttpError } from '../utils/HttpError';
import { getConnection } from 'typeorm';
import { LabClass } from '../lab-class/entity';

export async function registerStudentToLab(labClassID: number, studentID: number) {
  const connection = await getConnection();
  const labClassRepo = connection.getRepository(LabClass);
  const studentRepo = connection.getRepository(Student);

  const labClass = await labClassRepo.findOne(labClassID, { relations: ['course'] });
  if (!labClass) throw new HttpError(404, 'Lab with the given id does not exist');

  const student = await studentRepo.findOne(studentID);
  if (!student) throw new HttpError(404, 'Student with the given id does not exist');

  const existingRegistration = labClass.course.students.filter(
    stud => stud.id === student.id,
  );
  if (existingRegistration && existingRegistration.length > 0)
    throw new HttpError(400, 'Student already registered');

  if (labClass.students.length >= labClass.studentCapacity)
    throw new HttpError(400, 'Lab capacity is full');

  labClass.students.push(student);
  labClass.course.students.push(student);
  const result = await labClassRepo.save(labClass);

  return result;
}
