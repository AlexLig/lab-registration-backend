import { getRepository } from 'typeorm';

import { UserDto } from './dto';
import { HttpError } from '../utils/HttpError';
import { User } from './entity';
import bcrypt from 'bcrypt';

const getUserRepository = () => getRepository(User);

export async function createUser(dto: UserDto) {
  const repo = getUserRepository();

  const existingUser = await repo.findOne({ where: { email: dto.email } });
  if (existingUser) throw new HttpError(400, 'User already registered');

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(dto.password, salt);
  const user = { email: dto.email, password };

  return repo.save(user);
}

export async function getUserById(id: number) {
  const user = getUserRepository().findOne(id);
  if (!user) throw new HttpError(404, 'User with the given id was not found');
  return user;
}
