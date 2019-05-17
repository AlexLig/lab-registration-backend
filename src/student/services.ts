import { getRepository } from 'typeorm';
import { Student } from './entity';
import { StudentDto } from './dto';
import { HttpError } from '../utils/HttpError';
import { User } from '../user/entity';
import { getUserById } from '../user/services';

const getStudentRepository = () => getRepository(Student);

export async function createStudent(dto: StudentDto) {
  const repo = getStudentRepository();

  const existingStudent = await repo.findOne({ where: { am: dto.am } });
  if (existingStudent) throw new HttpError(400, 'Student already registered');

  const user = await getUserById(dto.userId);

  return repo.save({ ...dto, user });
}

export async function getAllStudents() {
  const repo = getStudentRepository();

  const students = await repo.find();
  return students;
}
