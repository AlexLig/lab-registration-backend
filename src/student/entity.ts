import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { LabClass } from '../lab-class/entity';

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
