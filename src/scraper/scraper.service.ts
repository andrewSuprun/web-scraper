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
    console.log(restaurantPageHTML);
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
    const lowestRating: string = infoScraperHelper.scrapeLowestRating();
    const highestRating: string = infoScraperHelper.scrapeHighestRating();
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

    for (let page = 0; page < 50; page += 50) {
      const link = `https://www.yelp.com/search?find_loc=${city}&start=${
        page * 10
      }`;
      const restaurantListPageHTML = await pageScraperHelper.scrapePage(link); // axios.get(url) => html
      restaurantlinks = restaurantlinks.concat(
        this.getRestaurantsLinks(restaurantListPageHTML),
      );
    }

    const restaurantsData = [];

    for (const restaurantsLink of restaurantlinks) {
      const restaurantLink = 'https://www.yelp.com/' + restaurantsLink;
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