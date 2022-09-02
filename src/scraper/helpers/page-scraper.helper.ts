import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import axios from 'axios';

export class PageScraperHelper {
  constructor() {}

  scrapePage = async (url: string): Promise<string> => {
    try {
      const { data } = await axios.get(url);
      return data + '';
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };

  delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
}
