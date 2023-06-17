import Feed from './Feed';
import { FeedScrap } from './FeedScrap';

export default class FeedScraperDomainService {
  private readonly feedScrapers: FeedScrap[];

  constructor(...feedScrapers: FeedScrap[]) {
    this.feedScrapers = feedScrapers;
  }

  async execute(): Promise<Feed[]> {
    const newFeedsPromises = this.feedScrapers.map(feedScraper => feedScraper.scrap()),
      newFeeds = (await Promise.allSettled(newFeedsPromises))
        .filter(({ status }) => status === 'fulfilled')
        .map(feedPromise => (feedPromise as PromiseFulfilledResult<Feed[]>).value)
        .flat();

    return newFeeds;
  }
}
