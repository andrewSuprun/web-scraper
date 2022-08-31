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
    return this.$('div[data-testid="photoHeader"]').find('h1').text().trim();
  };

  scrapeDescription = (): string => {
    return this.$('div.margin-b1-5__09f24__NHcQi')
      .find('p.css-levauet')
      .text()
      .trim();
  };

  scrapeImages = (): string[] => {
    const imglinks: string[] = [];
    this.$('div[class=" photo-header-media__09f24__ojlZt]').each((i, el) => {
      imglinks.push(this.$(el).find('a.css-1sie4w0').find('img').attr('src'));
      return true;
    });
    return imglinks;
  };

  scrapeAmenities = (): string => {
    return this.$('div[class=" arrange-unit__09f24__rqHTg"]')
      .find('span.css-1p9ibgf')
      .text()
      .trim();
  };

  scrapeWorkingHours = (): string => {
    return this.$('div.margin-b1-5__09f24__NHcQi') //
      .find('p.css-levauet')
      .text()
      .trim();
  };

  scrapeAddress = (): string => {
    return this.$('div[class="css-1vhakgw"]')
      .find('p.css-qyp8bo')
      .text()
      .trim();
  };

  setCity = (city): string => {
    return city;
  };

  scrapePhone = (): string => {
    return this.$('div[class="css-1vhakgw"]')
      .find('p.css-1p9ibgf')
      .text()
      .trim();
  };

  scrapeRating = (): number => {
    return +this.$('div.i-stars__09f24__M1AR7').data('aria-label');
  };

  scrapeLowestRating = (): string => {
    return this.$('div.margin-b1-5__09f24__NHcQi')
      .find('p.css-levauet')
      .text()
      .trim();
  };

  scrapeHighestRating = (): string => {
    return this.$('div.margin-b1-5__09f24__NHcQi')
      .find('p.css-levauet')
      .text()
      .trim();
  };
}
