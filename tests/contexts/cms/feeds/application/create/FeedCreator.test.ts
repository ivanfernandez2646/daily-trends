import FeedCreator, { FeedCreatorProps } from '../../../../../../src/contexts/cms/feeds/application/create/FeedCreator';
import Feed from '../../../../../../src/contexts/cms/feeds/domain/Feed';
import FeedAlreadyExists from '../../../../../../src/contexts/cms/feeds/domain/FeedAlreadyExists';
import FeedFinderDomainService from '../../../../../../src/contexts/cms/feeds/domain/FeedFinderDomainService';
import EventBusMock from '../../../shared/__mocks__/EventBus.mock';
import DateTimeValueObjectMother from '../../../shared/domain/DateTimeValueObject.mother';
import RequiredDateTimeValueObjectMother from '../../../shared/domain/RequiredDateTimeValueObject.mother';
import FeedRepositoryMock from '../../__mocks__/FeedRepositoryMock';
import FeedMother from '../../domain/Feed.mother';
import FeedCreatedDomainEventMother from '../../domain/FeedCreatedDomainEvent.mother';

describe('FeedCreator', () => {
  it('should throw a FeedAlreadyExists exception when the feed already exists', async () => {
    const repository = new FeedRepositoryMock(),
      eventBus = new EventBusMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      creator = new FeedCreator(repository, finderDomainService, eventBus),
      feed = FeedMother.random(),
      feedCreateProps = toFeedCreatorProps(feed);

    repository.whenFindThenReturn(feed);

    await expect(creator.execute(feedCreateProps)).rejects.toThrow(FeedAlreadyExists);

    repository.assertNothingSave();
  });

  it('should create a feed', async () => {
    const repository = new FeedRepositoryMock(),
      eventBus = new EventBusMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      creator = new FeedCreator(repository, finderDomainService, eventBus),
      feed = FeedMother.random({
        createdAt: RequiredDateTimeValueObjectMother.now(),
        updatedAt: DateTimeValueObjectMother.create(null)
      }),
      feedCreateProps = toFeedCreatorProps(feed);

    repository.whenFindThenReturn(null);

    const response = await creator.execute(feedCreateProps);

    expect(response).toStrictEqual(response);
    repository.assertSaveHasBeenCalledWith(feed);
  });

  it('should publish a FeedCreatedDomainEvent', async () => {
    const repository = new FeedRepositoryMock(),
      eventBus = new EventBusMock(),
      finderDomainService = new FeedFinderDomainService(repository),
      creator = new FeedCreator(repository, finderDomainService, eventBus),
      feed = FeedMother.random({
        createdAt: RequiredDateTimeValueObjectMother.now(),
        updatedAt: DateTimeValueObjectMother.create(null)
      }),
      feedCreateProps = toFeedCreatorProps(feed);

    repository.whenFindThenReturn(null);

    await creator.execute(feedCreateProps);

    eventBus.assertLastPublishedEventIs(FeedCreatedDomainEventMother.fromFeed(feed));
  });

  function toFeedCreatorProps(feed: Feed): FeedCreatorProps {
    return {
      id: feed.id.value,
      title: feed.title.value,
      description: feed.description.value,
      author: feed.author.value
    };
  }
});
