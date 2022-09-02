import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ScraperController } from '../scraper/scraper.controller';
import { ScraperService } from '../scraper/scraper.service';
import { Restaurant } from '../scraper/entities/restaurant.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { mailer } from '../scraper/dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(
    private mailService: MailerService,
    private readonly scraperService: ScraperService,
  ) {}

  @ApiOperation({
    summary: 'Getting restaurants by search query from data base',
  })
  @ApiResponse({ status: 200, type: [Restaurant] })
  @Get(':city')
  async plainTextEmail(
    @Body('toemail') toemail: string,
    @Param('city') city: string,
  ) {
    const res = JSON.stringify(
      await this.scraperService.getRestarauntsByCity(city),
    );
    await this.mailService.sendMail({
      to: toemail,
      from: 'suprunand2016@gmail.com',
      subject: 'Your restaurants respond',
      text: res,
    });
    return 'email send';
  }
}
