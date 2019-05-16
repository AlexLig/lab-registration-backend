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
  readonly startTime!: string;

  @IsMilitaryTime()
  readonly finishTime!: string;

  @IsInt()
  courseId!: number;
}
