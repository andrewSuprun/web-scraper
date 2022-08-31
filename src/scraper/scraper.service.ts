import { ConsoleLogger } from "@nestjs/common";
import { CheerioAPI, load } from "cheerio";
import { InfoScraperHelper } from "./helpers/info-scraper.helper";
import { PageScraperHelper } from "./helpers/page-scraper.helper";

export class ScraperService {
  async getRestaurantsLinks(htmlPage: string): Promise<string[]> {
    const $ = load(htmlPage);
    const infoScraperHelper = new InfoScraperHelper($);
    return infoScraperHelper.scrapeLinks();
  }

  async getRestaurauntInfo(restaurantPageHTML: string, queryCity: string) {
    const $: CheerioAPI = load(restaurantPageHTML);
    const infoScraperHelper = new InfoScraperHelper($);

    const name: string = infoScraperHelper.scrapeName();
    const description: string = infoScraperHelper.scrapeDescription();
    const images: string[] = infoScraperHelper.scrapeImages();
    const amenities: string = infoScraperHelper.scrapeAmenities();
    const workingHours: string = infoScraperHelper.scrapeWorkingHours();
    const address: string = infoScraperHelper.scrapeAddress();
    const city: string = infoScraperHelper.setCity(queryCity);
    const phone: string = infoScraperHelper.scrapePhone();
    const rating: number = infoScraperHelper.scrapeRating();
    const lowestRating: string = infoScraperHelper.scrapeLowestRatedReview();
    const highestRating: string = infoScraperHelper.scrapeHighestRatedReview();
    return {
      name,
      description,
      images,
      amenities,
      workingHours,
      address,
      city,
      phone,
      rating,
      lowestRating,
      highestRating,
    };
  }

  async scrapeRestaurantData(city: string) {
    let restaurantlinks = [];
    const pageScraperHelper = new PageScraperHelper();

    for (let page = 0; page < 5; page++) {
      const link = `https://www.yelp.com/search?find_loc=${city}&start=${
        page * 10
      }`;
      const restaurantListPageHTML =
        (await pageScraperHelper.scrapePage(link)) + ''; // axios.get(url) => html V
      restaurantlinks = restaurantlinks.concat(
        await this.getRestaurantsLinks(restaurantListPageHTML),
      );
    }
    console.log(
      'RESTAURANT LINKS ---',
      restaurantlinks,
      'RESTAURANT LINKS ---',
    );

    const restaurantsData = [];

    for (const restaurantsLink of restaurantlinks) {
      const restaurantLink = 'https://www.yelp.com/' + restaurantsLink;
      console.log(
        'RESTAURANT LINK -------------1',
        restaurantLink,
        restaurantsLink,
        'RESTAURANT LINK -------------1');

      const restaurantPageHTML = await pageScraperHelper.scrapePage(
        restaurantLink,
      );
      await pageScraperHelper.delay(500);
      restaurantsData.push(
        await this.getRestaurauntInfo(restaurantPageHTML, city), // here could be db create logic
      );
    }
    return restaurantsData;
  }
}
