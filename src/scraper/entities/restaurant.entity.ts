import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  images: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  workingHours: string;

  @Column()
  rating: string;

  @Column()
  LowestRatedReview: string;

  @Column()
  HighestRatedReview: string;
}
