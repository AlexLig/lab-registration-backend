import { StudentDto } from '../student/dto';
import { IsEmail, Length } from 'class-validator';

export class UserStudentDto extends StudentDto {
  @IsEmail()
  readonly email!: string;

  @Length(3, 50)
  readonly password!: string;
}
