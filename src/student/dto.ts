import { IsString, Length, IsAlphanumeric } from 'class-validator';

export class StudentDto {
  @IsString()
  readonly name!: string;

  @IsAlphanumeric()
  @Length(3, 9)
  readonly am!: string;
}
