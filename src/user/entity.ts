import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinTable } from 'typeorm';
import { Student } from '../student/entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToOne(type => Student)
  @JoinTable()
  student!: Student;
}
