import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Restaurant } from './scraper/entities/restaurant.entity';
import { ScraperModule } from './scraper/scraper.module';
import { EmailController } from './email/email.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.PASS_MAILER,
        auth: {
          user: process.env.USER_MAILER,
          pass: process.env.PASS_MAILER,
        },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.PORT_DB,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Restaurant],
      synchronize: process.env.NODE_ENV !== 'prod',
      autoLoadEntities: true,
    }),
    ScraperModule,
  ],
  controllers: [EmailController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
