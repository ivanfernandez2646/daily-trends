import MongoFeedRepository from '../../../../../../../src/contexts/cms/feeds/infrastructure/persistence/mongo/MongoFeedRepository';
import container from '../../../../../../apps/cms/backend/config';
import EnvironmentArranger from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import FeedMother from '../../../domain/Feed.mother';
import FeedIdMother from '../../../domain/FeedId.mother';

const repository: MongoFeedRepository = container.get('Apps.contexts.cms.feeds.FeedRepository'),
  environmentArrager: Promise<EnvironmentArranger> = container.get('Apps.contexts.cms.shared.EnvironmentArranger');

describe('MongoFeedRepository', () => {
  beforeEach(async () => {
    await (await environmentArrager).arrange();
  });

  afterAll(async () => {
    await (await environmentArrager).close();
  });

  describe('save', () => {
    it('should save a new feed', async () => {
      expect.hasAssertions();

      const feed = FeedMother.random();

      await repository.save(feed);

      expect(await repository.find(feed.id)).toStrictEqual(feed);
    });
  });

  describe('find', () => {
    it('should return an existing feed', async () => {
      expect.hasAssertions();

      const feed = FeedMother.random();

      await repository.save(feed);

      expect(await repository.find(feed.id)).toStrictEqual(feed);
    });

    it('sould return null when feed does not exist', async () => {
      expect.hasAssertions();

      const feed = await repository.find(FeedIdMother.random());

      expect(feed).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete an existing feed', async () => {
      expect.hasAssertions();

      const feed = FeedMother.random();

      await repository.save(feed);
      await repository.delete(feed);

      await expect(repository.find(feed.id)).resolves.toBeNull();
    });
  });
});
