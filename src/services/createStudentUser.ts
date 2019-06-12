import { StudentDto } from '../student/dto';
import { User } from '../user/entity';
import { Student } from '../student/entity';
import { HttpError } from '../utils/HttpError';
import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';

export async function createStudentUser(dto: StudentDto) {
  const connection = await getConnection();
  const userRepo = connection.getRepository(User);
  const studentRepo = connection.getRepository(Student);

  const existingUser = await userRepo.findOne({ where: { email: dto.email } });
  if (existingUser) throw new HttpError(400, 'User already registered');

  const existingStudent = await studentRepo.findOne({ where: { am: dto.am } });
  if (existingStudent) throw new HttpError(400, 'Student already registered');

  const result = await connection.transaction(async transactionalEntityManager => {
    const student = plainToClass(Student, dto, { excludeExtraneousValues: true });
    const savedStudent = await transactionalEntityManager.save(student);

    const userPlain = { ...dto, student };
    const user = plainToClass(User, userPlain, { excludeExtraneousValues: true });
    const savedUser = await transactionalEntityManager.save(user);

    return savedUser;
  });

  return result;
}
