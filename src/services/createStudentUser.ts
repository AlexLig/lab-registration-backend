import { StudentDto } from '../student/dto';
import { getRepository } from 'typeorm';
import { User } from '../user/entity';
import { Student } from '../student/entity';
import { HttpError } from '../utils/HttpError';
import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';

export async function createUser(dto: StudentDto) {
  const userRepo = getRepository(User);
  const studentRepo = getRepository(Student);

  const existingUser = await userRepo.findOne({ where: { email: dto.email } });
  if (existingUser) throw new HttpError(400, 'User already registered');

  const existingStudent = await studentRepo.findOne({ where: { am: dto.am } });
  if (existingStudent) throw new HttpError(400, 'Student already registered');

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(dto.password, salt);

  const student = plainToClass(Student, dto, { excludeExtraneousValues: true });
  const userPlain = { ...dto, password, student };
  const user = plainToClass(User, userPlain, { excludeExtraneousValues: true });

  const result = await getConnection().transaction(async transactionalEntityManager => {
    const savedUser = await transactionalEntityManager.save(user);
    const savedStudent = await transactionalEntityManager.save(student);

    return { savedUser, savedStudent };
  });

  return result;
}
