import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from '../course/entity';

@Entity()
export class LabClass {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500, unique: true })
  name!: string;

  @Column()
  dayIso!: number;

  @ManyToOne(type => Course, course => course.labClasses)
  course!: Course;
}
