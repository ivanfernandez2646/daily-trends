import jsdom from 'jsdom';
import Feed from '../../domain/Feed';
import { FeedScrap } from '../../domain/FeedScrap';
import FeedId from '../../domain/FeedId';
import FeedTitle from '../../domain/FeedTitle';
import FeedDescription from '../../domain/FeedDescription';
import FeedAuthor from '../../domain/FeedAuthor';
import FeedSource from '../../domain/FeedSource';
import FeedScraperBase from './FeedScraperBase';

export default class ElPaisFeedScraper extends FeedScraperBase implements FeedScrap {
  async scrap(): Promise<Feed[]> {
    const scrapedResult = await this.getScrapedResults('https://elpais.com/'),
      {
        window: { document }
      } = new jsdom.JSDOM(scrapedResult),
      feeds: Feed[] = [];

    for (const element of document.querySelectorAll('article')) {
      const txtAuthor = element.querySelector('.c_a')?.textContent?.trim(),
        txtTitle = element.querySelector('.c_h')?.textContent?.trim(),
        txtDescription = element.querySelector('.c_d')?.textContent?.trim();

      if (!txtAuthor || !txtTitle) {
        continue;
      }

      feeds.push(
        Feed.create({
          id: FeedId.random(),
          title: new FeedTitle(txtTitle),
          description: new FeedDescription(txtDescription ?? null),
          author: new FeedAuthor(txtAuthor),
          source: FeedSource.EL_PAIS
        })
      );

      if (feeds.length >= 5) {
        break;
      }
    }

    return feeds;
  }
}
