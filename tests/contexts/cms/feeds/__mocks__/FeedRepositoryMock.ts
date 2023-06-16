import Feed, { FeedPrimitives } from '../../../../../src/contexts/cms/feeds/domain/Feed';
import FeedId from '../../../../../src/contexts/cms/feeds/domain/FeedId';
import FeedRepository from '../../../../../src/contexts/cms/feeds/domain/FeedRepository';
import { Criteria } from '../../../../../src/contexts/cms/shared/domain/Criteria';
import { Nullable } from '../../../../../src/contexts/cms/shared/domain/Nullable';
import FeedMother from '../domain/Feed.mother';

export default class FeedRepositoryMock implements FeedRepository {
  private mockSave = jest.fn();

  private mockFind = jest.fn();

  private mockDelete = jest.fn();

  private mockSearch = jest.fn();

  async save(Feed: Feed): Promise<void> {
    this.mockSave(Feed);
  }

  assertSaveHasBeenCalledWith(feed: Feed): void {
    const { mock } = this.mockSave,
      lastSavedFeed = mock.calls[mock.calls.length - 1][0] as Feed,
      expectedBody: FeedPrimitives = {
        ...feed.toPrimitives(),
        createdAt: feed.createdAt.toString('YYYY-MM-DD') // remove time to avoid flaky test
      },
      lastSavedFeedBody: FeedPrimitives = {
        ...lastSavedFeed.toPrimitives(),
        createdAt: lastSavedFeed.createdAt.toString('YYYY-MM-DD') // remove time to avoid flaky test
      };

    expect(lastSavedFeed).toBeInstanceOf(Feed);
    expect(expectedBody).toStrictEqual(lastSavedFeedBody);
  }

  assertSaveHasBeenCalledWithDifferentId(feed: Feed) {
    const { mock } = this.mockSave,
      lastSavedFeed = mock.calls[mock.calls.length - 1][0] as Feed;

    expect(lastSavedFeed.id.value).not.toBe(feed.id.value);

    this.assertSaveHasBeenCalledWith(FeedMother.fromPrimitives({ ...feed.toPrimitives(), id: lastSavedFeed.id.value }));
  }

  assertSaveHasBeenCalledTimes(times: number) {
    expect(this.mockSave).toHaveBeenCalledTimes(times);
  }

  assertNothingSave(): void {
    expect(this.mockSave).not.toHaveBeenCalled();
  }

  async find(id: FeedId): Promise<Nullable<Feed>> {
    return this.mockFind(id);
  }

  whenFindThenReturn(feed: Nullable<Feed>): void {
    this.mockFind.mockReturnValue(feed);
  }

  whenFindThenReturnOnce(feed: Nullable<Feed>): void {
    this.mockFind.mockReturnValueOnce(feed);
  }

  assertFindHasBeenCalledWith(id: FeedId): void {
    expect(this.mockFind).toHaveBeenLastCalledWith(id);
  }

  async delete(feed: Feed): Promise<void> {
    return this.mockDelete(feed);
  }

  assertDeleteHasBeenCalledWith(feed: Feed): void {
    expect(this.mockDelete).toHaveBeenLastCalledWith(feed);
  }

  assertNothingDelete(): void {
    expect(this.mockDelete).not.toHaveBeenCalled();
  }

  search(criteria?: Criteria<FeedPrimitives> | undefined): Promise<Feed[]> {
    return this.mockSearch(criteria);
  }

  whenSearchThenReturn(feeds: Feed[]): void {
    this.mockSearch.mockReturnValueOnce(feeds);
  }

  assertSearchHasBeenCalledWith(criteria?: Criteria<FeedPrimitives> | undefined): void {
    expect(this.mockSearch).toHaveBeenLastCalledWith(criteria);
  }
}
