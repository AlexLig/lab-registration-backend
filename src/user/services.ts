import { getRepository } from 'typeorm';

import { UserDto } from './dto';
import { HttpError } from '../utils/HttpError';
import { User } from './entity';

const getUserRepository = () => getRepository(User);

export async function createUser(dto: UserDto) {
  const repo = getUserRepository();

  const existingStudent = await repo.findOne({ where: { email: dto.email } });
  if (existingStudent) throw new HttpError(400, 'User already registered');

  return repo.save(dto);
}
