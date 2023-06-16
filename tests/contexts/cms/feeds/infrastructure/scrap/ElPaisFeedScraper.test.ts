import Feed from '../../../../../../src/contexts/cms/feeds/domain/Feed';
import ElPaisFeedScraper from '../../../../../../src/contexts/cms/feeds/infrastructure/scrap/ElPaisFeedScraper';

describe('ElPaisFeedScraper', () => {
  it('should return 5 feeds from El Pais website', async () => {
    expect.hasAssertions();

    const scraper = new ElPaisFeedScraper(),
      result = await scraper.scrap();

    expect(result.length).toBe(5);
    expect(result).toBeInstanceOf(Array);
    result.map(feed => expect(feed).toBeInstanceOf(Feed));
  });
});
