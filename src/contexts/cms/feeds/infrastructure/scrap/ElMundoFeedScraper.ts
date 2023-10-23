import Feed from '../../domain/Feed';
import { FeedScrap } from '../../domain/FeedScrap';
import FeedSource from '../../domain/FeedSource';
import FeedScraperBase from './FeedScraperBase';

export default class ElMundoFeedScraper extends FeedScraperBase implements FeedScrap {
  async scrap(): Promise<Feed[]> {
    const feeds = await this.getScrapedResults('https://elmundo.es/', FeedSource.EL_MUNDO, {
      authorHTML: '.ue-c-cover-content__byline-name .ue-c-cover-content__link',
      titleHTML: '.ue-c-cover-content__headline',
      descriptionHTML: '.ue-c-cover-content__kicker',
      decodeChars: true
    });

    return feeds.map(feed =>
      Feed.fromPrimitives({ ...feed.toPrimitives(), description: feed.description.value?.slice(0, -1) ?? null })
    );
  }
}
