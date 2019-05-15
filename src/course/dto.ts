import { IsString, Length } from 'class-validator';

export class CourseDto {
  @Length(2, 255)
  @IsString()
  readonly name!: string;
}
