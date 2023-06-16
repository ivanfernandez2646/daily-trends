import { Criteria } from '../../shared/domain/Criteria';
import { Nullable } from '../../shared/domain/Nullable';
import Feed, { FeedPrimitives } from './Feed';
import FeedId from './FeedId';

interface FeedRepository {
  save(feed: Feed): Promise<void>;

  find(id: FeedId): Promise<Nullable<Feed>>;

  delete(feed: Feed): Promise<void>;

  search(criteria?: Criteria<FeedPrimitives>): Promise<Feed[]>;
}

export default FeedRepository;
