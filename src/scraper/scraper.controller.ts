import { Controller, Get, Param, Post } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create.restaurant.dto";
import { ScraperService } from "./scraper.service";


@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  // @Post('/:city')
  // create(@Param('city') city: string): Promise<CreateRestaurantDto[]> {
  //   // return this.scraperService.scrapeRestaurantData(city) // repository create
  // }

  @Get('/:city')
  getOne(@Param('city') city: string) {
    return this.scraperService.scrapeRestaurantData(city);
  }
}
