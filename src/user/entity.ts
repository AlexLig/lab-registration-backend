import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinTable } from 'typeorm';
import { Student } from '../student/entity';
import { Expose } from 'class-transformer';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id?: number;

  @Expose()
  @Column({ length: 50, unique: true })
  email!: string;

  @Expose()
  @Column()
  password!: string;

  @Expose()
  @Column()
  isAdmin!: boolean;

  @Expose()
  @OneToOne(type => Student)
  @JoinTable()
  student!: Student;
}
