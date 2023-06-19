import Feed from '../../domain/Feed';
import { FeedScrap } from '../../domain/FeedScrap';
import jsdom from 'jsdom';
import FeedId from '../../domain/FeedId';
import FeedTitle from '../../domain/FeedTitle';
import FeedAuthor from '../../domain/FeedAuthor';
import FeedDescription from '../../domain/FeedDescription';
import FeedSource from '../../domain/FeedSource';
import FeedScraperBase from './FeedScraperBase';

export default class ElMundoFeedScraper extends FeedScraperBase implements FeedScrap {
  async scrap(): Promise<Feed[]> {
    const scrapedResult = await this.getScrapedResults('https://elmundo.es/'),
      {
        window: { document }
      } = new jsdom.JSDOM(scrapedResult),
      feeds: Feed[] = [];

    for (const element of document.querySelectorAll('article')) {
      const txtAuthor = element
          .querySelector('.ue-c-cover-content__byline-name .ue-c-cover-content__link')
          ?.textContent?.trim(),
        txtTitle = element.querySelector('.ue-c-cover-content__headline')?.textContent?.trim(),
        txtDescription = element.querySelector('.ue-c-cover-content__kicker')?.textContent?.trim().slice(0, -1); // slice to remove "." char from El Mundo (make clean appearance)

      if (!txtAuthor || !txtTitle) {
        continue;
      }

      feeds.push(
        Feed.create({
          id: FeedId.random(),
          title: new FeedTitle(txtTitle),
          description: new FeedDescription(txtDescription ?? null),
          author: new FeedAuthor(txtAuthor),
          source: FeedSource.EL_MUNDO
        })
      );

      if (feeds.length >= 5) {
        break;
      }
    }

    return feeds;
  }
}
