import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { ScraperController } from "./scraper.controller";
import { ScraperService } from "./scraper.service";

@Module({
  providers: [ScraperService],
  controllers: [ScraperController],
  exports: [ScraperService],
  imports: [TypeOrmModule.forFeature([Restaurant])],
})
export class ScraperModule {}
