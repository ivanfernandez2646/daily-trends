import FeedSource from '../../../../../../../src/contexts/cms/feeds/domain/FeedSource';
import MongoFeedRepository from '../../../../../../../src/contexts/cms/feeds/infrastructure/persistence/mongo/MongoFeedRepository';
import container from '../../../../../../apps/cms/backend/config';
import EnvironmentArranger from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import FeedMother from '../../../domain/Feed.mother';
import FeedIdMother from '../../../domain/FeedId.mother';

const repository: MongoFeedRepository = container.get('Apps.cms.contexts.feeds.FeedRepository'),
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

  describe('search', () => {
    it('should filter feeds by filter criteria', async () => {
      const feeds = [
        FeedMother.random({ source: FeedSource.CMS }),
        FeedMother.random({ source: FeedSource.EL_MUNDO }),
        FeedMother.random({ source: FeedSource.EL_PAIS }),
        FeedMother.random({ source: FeedSource.CMS }),
        FeedMother.random({ source: FeedSource.CMS })
      ];

      await Promise.all(feeds.map(feed => repository.save(feed)));

      const res = await repository.search({
        filter: [{ source: FeedSource.CMS }]
      });

      expect(res.length).toBe(3);
    });

    it('should sort feeds by sort criteria', async () => {
      const feeds = [
        FeedMother.random({ source: FeedSource.CMS }),
        FeedMother.random({ source: FeedSource.EL_MUNDO }),
        FeedMother.random({ source: FeedSource.EL_PAIS }),
        FeedMother.random({ source: FeedSource.CMS }),
        FeedMother.random({ source: FeedSource.CMS })
      ];

      await Promise.all(feeds.map(feed => repository.save(feed)));

      const res = await repository.search({
        filter: [{ source: FeedSource.CMS }],
        sort: { createdAt: 'desc' }
      });

      expect(res.length).toBe(3);
      expect(res).toMatchObject(
        [...res].sort((feed1, feed2) => feed2.createdAt.toSeconds() - feed1.createdAt.toSeconds())
      );
    });

    it('should limit feeds by limit criteria', async () => {
      const feeds = [
        FeedMother.random({ source: FeedSource.CMS }),
        FeedMother.random({ source: FeedSource.EL_MUNDO }),
        FeedMother.random({ source: FeedSource.EL_PAIS }),
        FeedMother.random({ source: FeedSource.CMS }),
        FeedMother.random({ source: FeedSource.CMS })
      ];

      await Promise.all(feeds.map(feed => repository.save(feed)));

      const res = await repository.search({
        filter: [{ source: FeedSource.CMS }],
        sort: { createdAt: 'desc' },
        limit: 2
      });

      expect(res.length).toBe(2);
      expect(res).toMatchObject(
        [...res].sort((feed1, feed2) => feed2.createdAt.toSeconds() - feed1.createdAt.toSeconds())
      );
    });
  });
});
