import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CheerioAPI, load } from "cheerio";
import { randomUUID } from "crypto";
import { DataSource, Repository } from "typeorm";
import { CreateRestaurantDto } from "./dto/create.restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { InfoScraperHelper } from "./helpers/info-scraper.helper";
import { PageScraperHelper } from "./helpers/page-scraper.helper";

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  async getRestarauntsByCity(cityQuery: string): Promise<Restaurant[]> {
    try {
      console.log(cityQuery)

      const result = await this.restaurantsRepository.find({
        where: {
          city: cityQuery,
        },
      });
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  async createMany(restaurant: Restaurant[]) {
    try {
      const restaurantEntity = this.restaurantsRepository.create(restaurant);
      return this.restaurantsRepository.upsert(restaurantEntity, ['name']);
    } catch (error) {
      console.error(error);
    }
  }

  async getRestaurantsLinks(htmlPage: string): Promise<string[]> {
    const $ = load(htmlPage);
    const infoScraperHelper = new InfoScraperHelper($, null);
    return infoScraperHelper.scrapeLinks();
  }

  async getRestaurauntInfo(
    restaurantPageHTML: string,
    queryCity: string,
  ): Promise<CreateRestaurantDto> {
    const $: CheerioAPI = load(restaurantPageHTML);
    const $1: CheerioAPI = load(restaurantPageHTML.replace('desc', 'asc'));
    const infoScraperHelper = new InfoScraperHelper($, $1);

    const id: string = randomUUID();
    const name: string = infoScraperHelper.scrapeName();
    const description: string = infoScraperHelper.scrapeDescription();
    const images: string[] = infoScraperHelper.scrapeImages();
    const amenities: string[] = infoScraperHelper.scrapeAmenities();
    const workingHours: string[] = infoScraperHelper.scrapeWorkingHours();
    const address: string = infoScraperHelper.scrapeAddress();
    const city: string = infoScraperHelper.setCity(queryCity);
    const phone: string = infoScraperHelper.scrapePhone();
    const rating: string = infoScraperHelper.scrapeRating();
    const highestRatedReview: string =
      infoScraperHelper.scrapeHighestRatedReview();
    const lowestRatedReview: string =
      infoScraperHelper.scrapeLowestRatedReview();
    return {
      id,
      name,
      description,
      images,
      amenities,
      workingHours,
      address,
      city,
      phone,
      rating,
      lowestRatedReview,
      highestRatedReview,
    };
  }

  async scrapeRestaurantData(city: string) {
    let restaurantlinks = [];
    const pageScraperHelper = new PageScraperHelper();
    const restaurantsData = [];
    for (let page = 0; page < 5; page++) {
      const link = `https://www.yelp.com/search?cflt=restaurants&find_loc=${city}&start=${
        page * 10
      }`;
      const restaurantListPageHTML =
        (await pageScraperHelper.scrapePage(link)) + ''; // axios.get(url) => html V
      restaurantlinks = restaurantlinks.concat(
        await this.getRestaurantsLinks(restaurantListPageHTML),
      );
    }


    for (const restaurantsLink of restaurantlinks) {
      const restaurantLink =
        'https://www.yelp.com/' + restaurantsLink + '?sort_by=rating_desc';
      console.log(
        'RESTAURANT LINK -------------1',
        restaurantLink,
        restaurantsLink,
        'RESTAURANT LINK -------------1',
      );

      const restaurantPageHTML = await pageScraperHelper.scrapePage(
        restaurantLink,
      );
      await pageScraperHelper.delay(1000);
      const oneRestaurantdata = await this.getRestaurauntInfo(
        restaurantPageHTML,
        city,
      );
      restaurantsData.push(oneRestaurantdata);
    }

    return this.createMany(restaurantsData);
  }
}
