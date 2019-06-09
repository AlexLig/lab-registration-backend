import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { LabClass } from '../lab-class/entity';
import { User } from '../user/entity';
import { Expose } from 'class-transformer';
import { Course } from '../course/entity';

@Entity()
export class Student {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column({ length: 500 })
  name!: string;

  @Expose()
  @Column({ unique: true })
  am!: string;

  @Expose()
  @ManyToMany(type => LabClass, labclass => labclass.students)
  @JoinTable()
  labClasses!: LabClass[];

  @ManyToOne(type => Course, course => course.students)
  course!: Course;
}
