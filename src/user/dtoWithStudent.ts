import { StudentDto } from '../student/dto';
import { IsEmail, Length } from 'class-validator';

export class UserDtoWithStudent extends StudentDto {
  @IsEmail()
  readonly email!: string;

  @Length(3, 50)
  readonly password!: string;
}
