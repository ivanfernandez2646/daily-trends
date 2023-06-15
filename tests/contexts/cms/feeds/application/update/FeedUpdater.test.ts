import FeedUpdater from '../../../../../../src/contexts/cms/feeds/application/update/FeedUpdater';
import Feed from '../../../../../../src/contexts/cms/feeds/domain/Feed';
import FeedFinderDomainService from '../../../../../../src/contexts/cms/feeds/domain/FeedFinderDomainService';
import FeedNotFound from '../../../../../../src/contexts/cms/feeds/domain/FeedNotFound';
import FeedRepositoryMock from '../../__mocks__/FeedRepositoryMock';
import FeedMother from '../../domain/Feed.mother';
import FeedDescriptionMother from '../../domain/FeedDescription.mother';
import FeedIdMother from '../../domain/FeedId.mother';
import FeedTitleMother from '../../domain/FeedTitle.mother';

describe('FeedUpdater', () => {
  it('should throw a FeedNotFound exception when the feed does not exist', async () => {
    const repository = new FeedRepositoryMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      renamer = new FeedUpdater(repository, finderDomainService);

    repository.whenFindThenReturn(null);

    await expect(renamer.execute({ id: FeedIdMother.random().value })).rejects.toThrow(FeedNotFound);

    repository.assertNothingSave();
  });

  it('should not update a feed when feed properties values are the same that are stored', async () => {
    const repository = new FeedRepositoryMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      renamer = new FeedUpdater(repository, finderDomainService),
      feed = FeedMother.random();

    repository.whenFindThenReturn(feed);

    await renamer.execute({ id: feed.id.value, title: feed.title.value, description: feed.description.value });

    repository.assertNothingSave();
  });

  it('should update a feed', async () => {
    const repository = new FeedRepositoryMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      updater = new FeedUpdater(repository, finderDomainService),
      feed = FeedMother.random(),
      newTitle = FeedTitleMother.random(),
      newDescription = FeedDescriptionMother.random();

    repository.whenFindThenReturn(feed);

    const feedUpdated = await updater.execute({
      id: feed.id.value,
      title: newTitle.value,
      description: newDescription.value
    });

    expect(feedUpdated.updatedAt.value).not.toBeNull();
    expect(feedUpdated).toStrictEqual<Feed>(
      FeedMother.create({
        ...feed,
        title: newTitle,
        description: newDescription,
        updatedAt: feedUpdated.updatedAt
      })
    );
    repository.assertSaveHasBeenCalledWith(feedUpdated);
  });
});
