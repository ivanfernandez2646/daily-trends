import Feed from './Feed';
import FeedId from './FeedId';
import FeedNotFound from './FeedNotFound';
import FeedRepository from './FeedRepository';

export default class FeedFinderDomainService {
  constructor(private readonly repository: FeedRepository) {}

  async execute(id: FeedId): Promise<Feed> {
    const feed = await this.repository.find(id);

    if (!feed) {
      throw new FeedNotFound(id);
    }

    return feed;
  }
}
