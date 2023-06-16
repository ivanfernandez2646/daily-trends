import { Criteria } from '../../../../shared/domain/Criteria';
import { Nullable } from '../../../../shared/domain/Nullable';
import { MongoRepository } from '../../../../shared/infrastructure/persistence/mongo/MongoRepository';
import Feed, { FeedPrimitives } from '../../../domain/Feed';
import FeedId from '../../../domain/FeedId';
import FeedRepository from '../../../domain/FeedRepository';

export default class MongoFeedRepository extends MongoRepository<Feed> implements FeedRepository {
  protected collectionName(): string {
    return 'feeds';
  }

  save(feed: Feed): Promise<void> {
    return super.persist(feed.id.value, feed);
  }

  find(id: FeedId): Promise<Nullable<Feed>> {
    return super.byId(id.value, Feed.fromPrimitives);
  }

  delete(feed: Feed): Promise<void> {
    return super.remove(feed.id.value);
  }

  search(criteria?: Criteria<FeedPrimitives>): Promise<Feed[]> {
    return super.byCriteria(criteria ?? {}, Feed.fromPrimitives);
  }
}
