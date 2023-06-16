import FeedSearcher from '../../../../../../src/contexts/cms/feeds/application/search/FeedSearcher';
import { FeedPrimitives } from '../../../../../../src/contexts/cms/feeds/domain/Feed';
import { Criteria } from '../../../../../../src/contexts/cms/shared/domain/Criteria';
import FeedRepositoryMock from '../../__mocks__/FeedRepositoryMock';
import FeedMother from '../../domain/Feed.mother';

describe('FeedSearcher', () => {
  it('should returns feeds', async () => {
    const repository = new FeedRepositoryMock(),
      searcher = new FeedSearcher(repository),
      feeds = [FeedMother.random(), FeedMother.random()],
      criteria: Criteria<FeedPrimitives> = {};

    repository.whenSearchThenReturn(feeds);

    const response = await searcher.execute({});

    expect(response).toStrictEqual(feeds);
    repository.assertSearchHasBeenCalledWith(criteria);
  });
});
