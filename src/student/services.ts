import { getRepository } from 'typeorm';
import { Student } from './entity';
import { StudentDto } from './dto';
import { HttpError } from '../utils/HttpError';

const getStudentRepository = () => getRepository(Student);

export async function createStudent(dto: StudentDto) {
  const repo = getStudentRepository();

  const existingStudent = await repo.findOne({ where: { am: dto.am } });
  if (existingStudent) throw new HttpError(400, 'Student already registered');

  return repo.save(dto);
}

export async function getAllStudents() {
  const repo = getStudentRepository();

  const students = await repo.find();
  return students;
}
