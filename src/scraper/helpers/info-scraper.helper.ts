import { CheerioAPI } from 'cheerio';

export class InfoScraperHelper {
  $: CheerioAPI;

  constructor($: CheerioAPI) {
    this.$ = $;
  }

  scrapeLinks = (): string[] => {
    const links: string[] = [];
    this.$('a.css-1m051bw')
      .filter((_i, el) => /^\/biz\//.test(this.$(el).attr('href')))
      .each((i, el) => {
        links.push(this.$(el).attr('href')); //"/biz/da-andrea-new-york"
        return true;
      });
    return links;
  };

  scrapeName = (): string => {
    const name: string = this.$('div[data-testid="photoHeader"]')
      .find('h1')
      .text()
      .trim();
    console.log(name, '<-Name');
    return name;
  };

  scrapeDescription = (): string => {
    const description: string = this.$('div.margin-b1-5__09f24__NHcQi')
      .find('p.css-1evauet')
      .text();
    console.log(description, 'Description');
    return description;
  };

  scrapeAddress = (): string => {
    const address = this.$('div.css-1vhakgw').find('p.css-qyp8bo').text();
    console.log(address, 'Address');
    return address;
  };

  setCity = (city): string => {
    console.log(city, 'City');
    return city;
  };

  scrapePhone = (): string => {
    const phone: string = this.$('div.css-1vhakgw')
      .find('p.css-1p9ibgf')
      .eq(-2)
      .text();
    console.log(phone, '<-Phone');
    return phone;
  };

  scrapeImages = (): string[] => {
    const imglinks: string[] = [];
    this.$('div.photo-header-media__09f24__ojlZt').each((i, el) => {
      // console.log(this.$(el).find('a.css-1sie4w0').find('img').attr('src'));
      imglinks.push(this.$(el).find('a.css-1sie4w0').find('img').attr('src'));
      return true;
    });
    console.log(imglinks);
    return imglinks.filter((el: string) => el);
  };

  scrapeAmenities = (): string => {
    const amenities: string = this.$('div.arrange-unit__09f24__rqHTg')
      .find('span.css-1p9ibgf')
      .map((i, el) => {
        return this.$(el).text();
      })
      .toArray()
      .join(' ');
    console.log(amenities, 'Amenities');
    return amenities;
  };

  scrapeWorkingHours = (): string => {
    return this.$('div.margin-b1-5__09f24__NHcQi') //
      .find('p.css-levauet')
      .text()
      .trim();
  };

  scrapeRating = (): string => {
    const rating = this.$('div.i-stars__09f24__M1AR7').attr('aria-label');
    console.log(rating, 'RATING');
    return rating + '';
  };

  scrapeHighestRatedReview = (): string => {
    return this.$('div.margin-b1-5__09f24__NHcQi')
      .find('p.css-levauet')
      .text()
      .trim();
  };

  scrapeLowestRatedReview = (): string => {
    return this.$('div.margin-b1-5__09f24__NHcQi')
      .find('p.css-levauet')
      .text()
      .trim();
  };

}
