import { CheerioAPI } from 'cheerio';

export class InfoScraperHelper {
  $: CheerioAPI;
  $1: CheerioAPI;
  constructor($: CheerioAPI, $1: CheerioAPI) {
    this.$ = $;
    this.$1 = $1;
  }

  scrapeLinks = (): string[] => {
    const links: string[] = [];
    this.$('a.css-1m051bw')
      .filter((_i, el) => /^\/biz\//.test(this.$(el).attr('href')))
      .each((i, el) => {
        links.push(this.$(el).attr('href'));
        return true;
      });
    return links;
  };

  scrapeName = (): string => {
    const name: string = this.$('div[data-testid="photoHeader"]')
      .find('h1')
      .text()
      .trim();
    return name;
  };

  scrapeDescription = (): string => {
    const description: string = this.$('div.margin-b1-5__09f24__NHcQi')
      .find('p.css-1evauet')
      .text();
    return description;
  };

  scrapeAddress = (): string => {
    const address = this.$('div.css-1vhakgw').find('p.css-qyp8bo').text();
    return address;
  };

  setCity = (city): string => {
    return city;
  };

  scrapePhone = (): string => {
    const phone: string = this.$('div.css-1vhakgw')
      .find('p.css-1p9ibgf')
      .eq(-2)
      .text();
    return phone;
  };

  scrapeImages = (): string[] => {
    const imglinks: string[] = [];
    this.$('div.photo-header-media__09f24__ojlZt').each((i, el) => {
      imglinks.push(this.$(el).find('a.css-1sie4w0').find('img').attr('src'));
      return true;
    });
    return imglinks.filter((el: string) => el);
  };

  scrapeAmenities = (): string[] => {
    const amenities: string[] = this.$('div.arrange-unit__09f24__rqHTg')
      .find('span.css-1p9ibgf')
      .map((i, el) => {
        return this.$(el).text();
      })
      .toArray()
    console.log(amenities, 'Amenities');
    return amenities;
  };

  scrapeWorkingHours = (): string[] => {
    const workingHours: string[] = [];
    this.$('table')
      .find('tr')
      .each((_i, el) => {
        const day = this.$(el)
          .find('p')
          .text()
          .replace(/(.{3})/, '$1 ');
        if (day) {
          workingHours.push(day);
        }
      });
    return workingHours;
  };

  scrapeRating = (): string => {
    const rating = this.$('div.i-stars__09f24__M1AR7').attr('aria-label');
    return rating + '';
  };

  scrapeHighestRatedReview = (): string => {
    const highestRatedReview = this.$('div.margin-b2__09f24__CEMjT')
      .find('p.comment__09f24__gu0rG')
      .find('span.raw__09f24__T4Ezm')
      .text();
    console.log(highestRatedReview, 'HIGHES RATED REVIEW');
    return highestRatedReview;
  };

  scrapeLowestRatedReview = (): string => {
    const lowestRatedReview = this.$1('div.margin-b2__09f24__CEMjT')
      .find('p.comment__09f24__gu0rG')
      .find('span.raw__09f24__T4Ezm')
      .text();
    console.log(lowestRatedReview, 'LOWEEST RATED REVIEW');
    return lowestRatedReview;
  };
}
