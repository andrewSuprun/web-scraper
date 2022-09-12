import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @ApiProperty({
    example: 'uuid',
    description: 'Primary column generetad by randomUUID',
  })
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Restaurant Name',
    description: 'Restaurant name field',
  })
  @Column('text')
  name: string;

  @ApiProperty({
    example:
      'Berners Tavern, located in The London EDITION, is a gastronomic gem within a breathtaking setting. The restaurant offers a contemporary British menu which incorporate fresh and quality produce.…',
    description: 'Restaurant description',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    example:
      'https://s3-media0.fl.yelpcdn.com/bphoto/84iMzKwcbFMjeEuv8-5doA/l.jpg,https://s3-media0.fl.yelpcdn.com/bphoto/ZMSUiqsroKic2yMcvq7DxQ/l.jpg,https://s3-media0.fl.yelpcdn.com/bphoto/FIdLItjWbOS-v2R3gyNW_Q/l.jpg,https://s3-media0.fl.yelpcdn.com/bphoto/-WJKY_gGM9vv0T4gH66YaA/l.jpg,https://s3-media0.fl.yelpcdn.com/bphoto/FcBs6ZNCw24ARKSu_Ja0vQ/l.jpg,https://s3-media0.fl.yelpcdn.com/bphoto/XVMQ29382kCgAvxqGpuLqA/l.jpg',
    description: 'Restaurant images array',
  })
  @Column('simple-array')
  images: string[];

  @ApiProperty({
    example: 'Takes Reservations,Many Vegetarian Options',
    description: 'Amenities',
  })
  @Column('simple-array')
  amenities: string[];

  @ApiProperty({
    example: '10 Berners Street London W1T 3NP United Kingdom',
    description: 'Address field',
  })
  @Column('text')
  address: string;

  @ApiProperty({
    example: '020 7781 0000',
    description: 'Phone number',
  })
  @Column('text')
  phone: string;

  @ApiProperty({
    example: 'london',
    description: 'Restaurant`s placement city',
  })
  @Column('text')
  city: string;

  @ApiProperty({
    example:
      'Mon 7:00 AM - 12:00 AM (Next day),Tue 7:00 AM - 12:00 AM (Next day),Wed 7:00 AM - 12:00 AM (Next day),Thu 7:00 AM - 12:00 AM (Next day),Fri 7:00 AM - 12:00 AM (Next day),Sat 9:00 AM - 12:00 AM (Next day),Sun 9:00 AM - 12:00 AM (Next day)',
    description: 'Array of working days and hours',
  })
  @Column('simple-array')
  workingHours: string[];

  @ApiProperty({
    example: '4.5 star rating',
    description: 'Rating',
  })
  @Column('text')
  rating: string;

  @ApiProperty({
    example: 'Bad place to visit',
    description: 'Lowest rated review',
  })
  @Column('text')
  lowestRatedReview: string;

  @ApiProperty({
    example: 'STUNNING setting. Gorgeous gorgeous gorgeous! We were graciously greeted upon arrival, taken to a great table, and the service was outstanding. The server was so friendly and happy!  I devoured the fish and chips- A+. The wine list was really outstanding and my husband ate the burrata, Mac and cheese lol, and a chicken piccata dish (I believe) and loved it. Everything about Berners Tavern was amazing. The atmosphere is lively and great spot for girls night out, date nights, or like us, tourists in London Town!Excellent service and fantastic food. Had the eggs and salmon, pirate with berries and chia for breakfast. Excellent lattes as well as service.So great. Incredible room. But you probably already know that. I came here in an old NC State hoodie but they treated me as nice and friendly as the other finely appointed guests. Super high scale but humble. They call themselves a "Tavern"....',
    description: 'Highest rated review',
  })
  @Column('text')
  highestRatedReview: string;
}
