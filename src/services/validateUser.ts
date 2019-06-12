import { getRepository } from 'typeorm';
import { HttpError } from '../utils/HttpError';
import { User } from '../user/entity';
import { Student } from '../student/entity';

export async function validateUser(dto: any) {
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({
    where: { email: dto.email },
    relations: ['student'],
  });
  if (!user) throw new HttpError(400, 'Invalid email or password');

  const validPassword = dto.password === user.password;
  if (!validPassword) throw new HttpError(400, 'Invalid email or password');

  return user;
}
