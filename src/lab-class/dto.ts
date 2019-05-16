import {
  IsString,
  Length,
  IsInt,
  Min,
  Max,
  IsMilitaryTime,
  IsISO8601,
} from 'class-validator';

export class LabClassDto {
  @IsInt()
  @Min(1)
  @Max(30)
  readonly studentCapacity!: number;

  @IsInt()
  @Min(1)
  @Max(7)
  readonly dayIso!: number;

  @IsMilitaryTime()
  @IsISO8601()
  readonly startTime!: string;

  @IsMilitaryTime()
  @IsISO8601()
  readonly finishTime!: string;

  @IsInt()
  courseId!: number;
}
