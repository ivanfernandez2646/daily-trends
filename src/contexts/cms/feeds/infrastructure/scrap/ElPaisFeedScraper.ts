import Feed from '../../domain/Feed';
import { FeedScrap } from '../../domain/FeedScrap';
import FeedSource from '../../domain/FeedSource';
import FeedScraperBase from './FeedScraperBase';

export default class ElPaisFeedScraper extends FeedScraperBase implements FeedScrap {
  async scrap(): Promise<Feed[]> {
    return this.getScrapedResults('https://elpais.com/', FeedSource.EL_PAIS, {
      authorHTML: '.c_a',
      titleHTML: '.c_h',
      descriptionHTML: '.c_d'
    });
  }
}
