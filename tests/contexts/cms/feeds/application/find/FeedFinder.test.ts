import FeedFinder from '../../../../../../src/contexts/cms/feeds/application/find/FeedFinder';
import FeedFinderDomainService from '../../../../../../src/contexts/cms/feeds/domain/FeedFinderDomainService';
import FeedNotFound from '../../../../../../src/contexts/cms/feeds/domain/FeedNotFound';
import FeedRepositoryMock from '../../__mocks__/FeedRepositoryMock';
import FeedMother from '../../domain/Feed.mother';
import FeedIdMother from '../../domain/FeedId.mother';

describe('FeedFinder', () => {
  it('should throw a FeedNotFound exception when the feed does not exist', async () => {
    const repository = new FeedRepositoryMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      finder = new FeedFinder(finderDomainService);

    repository.whenFindThenReturn(null);

    await expect(finder.execute(FeedIdMother.random())).rejects.toThrow(FeedNotFound);
  });

  it('should returns a feed', async () => {
    const repository = new FeedRepositoryMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      finder = new FeedFinder(finderDomainService),
      feed = FeedMother.random();

    repository.whenFindThenReturn(feed);

    const response = await finder.execute(feed.id);

    repository.assertFindHasBeenCalledWith(feed.id);
    expect(response).toStrictEqual(feed);
  });
});
