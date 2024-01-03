import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Role } from '../type/userRole.type';
// import { Booking } from './booking.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false }) // 제발 여기 쓸 때 DB형식으로 쓰기.. TypeScript변수 선언이랑 계속 헷갈린다
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', default: 1000000, nullable: false })
  point: number;

  @Column({ type: 'int', nullable: false })
  phone_number: number;

  @Column({ type: 'varchar', nullable: false })
  adress: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  // @OneToMany(() => Booking, (booking) => booking.user)
  // booking: Booking[];
}
