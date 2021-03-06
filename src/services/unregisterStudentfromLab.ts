import { Student } from '../student/entity';
import { HttpError } from '../utils/HttpError';
import { getConnection } from 'typeorm';
import { LabClass } from '../lab-class/entity';
import { Course } from '../course/entity';

export async function unregisterStudentToLab(labClassID: number, studentID: number) {
  const connection = await getConnection();
  const labClassRepo = connection.getRepository(LabClass);
  const studentRepo = connection.getRepository(Student);
  const courseRepo = connection.getRepository(Course);

  const labClass = await labClassRepo.findOne(labClassID, {
    relations: ['course', 'students'],
  });
  if (!labClass) throw new HttpError(404, 'Lab with the given id does not exist');

  const course = await courseRepo.findOne(labClass.course.id, {
    relations: ['students'],
  });
  if (!course) throw new HttpError(404, 'Course with the given id does not exist');

  const student = await studentRepo.findOne(studentID);
  if (!student) throw new HttpError(404, 'Student with the given id does not exist');

  const existingRegistration =
    course.students && course.students.filter(stud => stud.id === student.id);
  if (!(existingRegistration && existingRegistration.length > 0))
    throw new HttpError(400, 'Student is not registered in this lab class,');

  const result = await connection.transaction(async transactionalEntityManager => {
    labClass.students = labClass.students.filter(st => st.id !== student.id);
    course.students = course.students.filter(st => st.id !== student.id);
    await transactionalEntityManager.save(course);
    const lab = await transactionalEntityManager.save(labClass);

    return lab;
  });
  return result;
}
