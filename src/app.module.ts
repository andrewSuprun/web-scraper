import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './scraper/entities/restaurant.entity';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pvaTkrc89',
      database: 'WEB-SCRAPPER-API',
      entities: [Restaurant],
      synchronize: true,
    }),
    ScraperModule,
  ],
})
export class AppModule {}
