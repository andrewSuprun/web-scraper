import axios from 'axios';

export class PageScraperHelper {
  constructor() {}

  scrapePage = async (url: string): Promise<string> => {
    try {
      const { data } = await axios.get(url);
      return data + '';
    } catch (error) {
      console.error(error.message);
    }
  };

  delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
}
