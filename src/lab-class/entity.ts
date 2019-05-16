import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Course } from '../course/entity';
import { Student } from '../student/entity';

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

  @ManyToMany(type => Student, student => student.labClasses)
  students!: Student[];
}
