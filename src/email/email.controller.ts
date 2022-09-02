import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ScraperController } from '../scraper/scraper.controller';
import { ScraperService } from '../scraper/scraper.service';

@Controller('email')
export class EmailController {
  constructor(
    private mailService: MailerService,
    private readonly scraperService: ScraperService,
  ) {}

  @Get(':city')
  async plainTextEmail(
    @Body('toemail') toemail: string,
    @Param('city') city: string,
  ) {
    const res = JSON.stringify(
      await this.scraperService.getRestarauntsByCity(city),
    );
    console.log(this.scraperService.getRestarauntsByCity(city));
    await this.mailService.sendMail({
      to: toemail,
      from: 'suprunand2016@gmail.com',
      subject: 'Your restaurants respond',
      text: res,
    });
    return 'email send';
  }
}


