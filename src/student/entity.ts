import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { LabClass } from '../lab-class/entity';
import { User } from '../user/entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  name!: string;

  @Column({ unique: true })
  am!: string;

  @ManyToMany(type => LabClass, labclass => labclass.students)
  @JoinTable()
  labClasses!: LabClass[];

}
