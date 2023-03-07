import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as moment from 'moment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  createdAt: Date;

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string;
}
