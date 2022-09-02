import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRestaurantDto } from "./dto/create.restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { ScraperService } from "./scraper.service";

@ApiTags('Restaurants scraper')
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @ApiOperation({
    summary: 'Inserting 50 restaurants from search query into data base',
  })
  @ApiResponse({ status: 200 })
  @Post('/:city')
  create(@Param('city') city: string) {
    return this.scraperService.scrapeRestaurantData(city);
  }
}
