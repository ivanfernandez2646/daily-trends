import FeedDeleter from '../../../../../../src/contexts/cms/feeds/application/delete/FeedDeleter';
import FeedFinderDomainService from '../../../../../../src/contexts/cms/feeds/domain/FeedFinderDomainService';
import FeedNotFound from '../../../../../../src/contexts/cms/feeds/domain/FeedNotFound';
import FeedRepositoryMock from '../../__mocks__/FeedRepositoryMock';
import FeedMother from '../../domain/Feed.mother';
import FeedIdMother from '../../domain/FeedId.mother';

describe('FeedDeleter', () => {
  it('should throw a FeedNotFound exception when the feed does not exist', async () => {
    const repository = new FeedRepositoryMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      deleter = new FeedDeleter(repository, finderDomainService);

    repository.whenFindThenReturn(null);

    await expect(deleter.execute(FeedIdMother.random())).rejects.toThrow(FeedNotFound);

    repository.assertNothingDelete();
  });

  it('should delete a feed', async () => {
    const repository = new FeedRepositoryMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      deleter = new FeedDeleter(repository, finderDomainService),
      feed = FeedMother.random();

    repository.whenFindThenReturn(feed);

    await deleter.execute(feed.id);

    repository.assertDeleteHasBeenCalledWith(feed);
  });
});
