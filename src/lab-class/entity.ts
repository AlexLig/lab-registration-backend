import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from '../course/entity';

@Entity()
export class LabClass {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('integer')
  studentCapacity!: number;

  @Column('integer')
  dayIso!: number;

  @Column('time')
  startTime!: string;

  @Column('time')
  finishTime!: string;

  @ManyToOne(type => Course, course => course.labClasses)
  course!: Course;
}
