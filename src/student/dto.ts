import { IsString, Length, IsAlphanumeric } from 'class-validator';

export class StudentDto {
  @IsString()
  @Length(2, 255)
  readonly name!: string;

  @IsAlphanumeric()
  @Length(3, 9)
  readonly am!: string;
}
