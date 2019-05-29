import { IsString, Length, IsAlphanumeric, IsInt } from 'class-validator';
import { UserDto } from '../user/dto';

export class StudentDto extends UserDto {
  @IsString()
  @Length(2, 255)
  readonly name!: string;

  @IsAlphanumeric()
  @Length(3, 9)
  readonly am!: string;
}
