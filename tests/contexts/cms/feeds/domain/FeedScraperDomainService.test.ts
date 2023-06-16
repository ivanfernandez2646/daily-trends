import Feed from '../../../../../src/contexts/cms/feeds/domain/Feed';
import { FeedScrap } from '../../../../../src/contexts/cms/feeds/domain/FeedScrap';
import FeedScraperDomainService from '../../../../../src/contexts/cms/feeds/domain/FeedScraperDomainService';
import FeedMother from './Feed.mother';

class DummyFeedScraper implements FeedScrap {
  scrap(): Promise<Feed[]> {
    return new Promise(res => res([FeedMother.random()]));
  }
}

class DummyFeedScraper1 implements FeedScrap {
  scrap(): Promise<Feed[]> {
    return new Promise(res => res([FeedMother.random(), FeedMother.random()]));
  }
}

describe('FeedScraperDomainService', () => {
  it('should call scrap() method for each instance received', async () => {
    expect.hasAssertions();

    const feedScrapers = [new DummyFeedScraper(), new DummyFeedScraper1()],
      feedScraperDomainService = new FeedScraperDomainService(...feedScrapers),
      spy1 = jest.spyOn(DummyFeedScraper.prototype, 'scrap'),
      spy2 = jest.spyOn(DummyFeedScraper1.prototype, 'scrap');

    await feedScraperDomainService.execute();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });

  it('should return all feeds for the differents scrapers', async () => {
    expect.hasAssertions();

    const feedScrapers = [new DummyFeedScraper(), new DummyFeedScraper1()],
      feedScraperDomainService = new FeedScraperDomainService(...feedScrapers),
      result = await feedScraperDomainService.execute();

    expect(result.length).toBe(3);
  });
});
