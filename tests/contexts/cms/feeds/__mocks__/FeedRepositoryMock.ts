import Feed, { FeedPrimitives } from '../../../../../src/contexts/cms/feeds/domain/Feed';
import FeedId from '../../../../../src/contexts/cms/feeds/domain/FeedId';
import FeedRepository from '../../../../../src/contexts/cms/feeds/domain/FeedRepository';
import { Nullable } from '../../../../../src/contexts/cms/shared/domain/Nullable';

export default class FeedRepositoryMock implements FeedRepository {
  private mockSave = jest.fn();

  private mockFind = jest.fn();

  private mockDelete = jest.fn();

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

  assertNothingUpdate(): void {
    expect(this.mockSave).not.toHaveBeenCalled();
  }

  async find(id: FeedId): Promise<Nullable<Feed>> {
    return this.mockFind(id);
  }

  whenFindThenReturn(feed: Nullable<Feed>): void {
    this.mockFind.mockReturnValue(feed);
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
}
