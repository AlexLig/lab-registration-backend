import { Length, IsEmail } from 'class-validator';

export class UserDto {
  @IsEmail()
  readonly email!: string;

  @Length(3, 50)
  readonly password!: string;
}
