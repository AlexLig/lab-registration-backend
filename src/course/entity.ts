import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LabClass } from '../lab-class/entity';
import { Student } from '../student/entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500, unique: true })
  name!: string;

  @OneToMany(type => LabClass, labClass => labClass.course)
  labClasses!: LabClass[];

  @OneToMany(type => Student, student => student.course)
  students!: Student[];
}
