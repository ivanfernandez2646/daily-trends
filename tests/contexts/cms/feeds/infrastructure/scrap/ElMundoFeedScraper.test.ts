import Feed from '../../../../../../src/contexts/cms/feeds/domain/Feed';
import ElMundoFeedScraper from '../../../../../../src/contexts/cms/feeds/infrastructure/scrap/ElMundoFeedScraper';

describe('ElMundoFeedScraper', () => {
  it('should return 5 feeds from El Mundo website', async () => {
    expect.hasAssertions();

    const scraper = new ElMundoFeedScraper(),
      result = await scraper.scrap();

    expect(result.length).toBe(5);
    expect(result).toBeInstanceOf(Array);
    result.map(feed => expect(feed).toBeInstanceOf(Feed));
  }, 30000);
});
