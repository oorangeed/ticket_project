import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'concert',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  concert_name: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'int', nullable: false })
  running_time: number;

  @Column({ type: 'int', nullable: false })
  price: number;

  //   @OneToMany(() => Schedule, (schedule) => schedule.concert)
  //   schedule: Schedule;
}
