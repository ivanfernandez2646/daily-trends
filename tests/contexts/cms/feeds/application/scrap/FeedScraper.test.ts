import FeedScraper from '../../../../../../src/contexts/cms/feeds/application/scrap/FeedScraper';
import Feed from '../../../../../../src/contexts/cms/feeds/domain/Feed';
import FeedFinderDomainService from '../../../../../../src/contexts/cms/feeds/domain/FeedFinderDomainService';
import { FeedScrap } from '../../../../../../src/contexts/cms/feeds/domain/FeedScrap';
import FeedScraperDomainService from '../../../../../../src/contexts/cms/feeds/domain/FeedScraperDomainService';
import FeedRepositoryMock from '../../__mocks__/FeedRepositoryMock';
import FeedMother from '../../domain/Feed.mother';
import FeedIdMother from '../../domain/FeedId.mother';

class DummyFeedScraper implements FeedScrap {
  constructor(private readonly feeds: Feed[]) {}

  scrap(): Promise<Feed[]> {
    return new Promise(res => {
      res(this.feeds);
    });
  }
}

describe('FeedScraper', () => {
  it('should save feeds when feed scraper domain service returns them', async () => {
    const repository = new FeedRepositoryMock(),
      feeds = [FeedMother.random(), FeedMother.random()],
      feedScraperDomainService = new FeedScraperDomainService(new DummyFeedScraper(feeds)),
      feedFinderDomainService = new FeedFinderDomainService(repository),
      scraper = new FeedScraper(repository, feedScraperDomainService, feedFinderDomainService);

    await scraper.execute();

    repository.assertSaveHasBeenCalledTimes(feeds.length);
    repository.assertSaveHasBeenCalledWith(feeds[feeds.length - 1]);
  });

  it('should generate new ids for feeds and save them when the id generate is repeated in persistence', async () => {
    const repository = new FeedRepositoryMock(),
      id = FeedIdMother.random(),
      feeds = [FeedMother.random({ id })],
      feedScraperDomainService = new FeedScraperDomainService(new DummyFeedScraper(feeds)),
      feedFinderDomainService = new FeedFinderDomainService(repository),
      scraper = new FeedScraper(repository, feedScraperDomainService, feedFinderDomainService);

    repository.whenFindThenReturnOnce(feeds[0]);

    await scraper.execute();

    repository.assertSaveHasBeenCalledTimes(feeds.length);
    repository.assertSaveHasBeenCalledWithDifferentId(feeds[feeds.length - 1]);
  });
});
