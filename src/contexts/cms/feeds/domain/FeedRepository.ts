import { Nullable } from '../../shared/domain/Nullable';
import Feed from './Feed';
import FeedId from './FeedId';

interface FeedRepository {
  save(feed: Feed): Promise<void>;

  find(id: FeedId): Promise<Nullable<Feed>>;

  delete(feed: Feed): Promise<void>;
}

export default FeedRepository;
