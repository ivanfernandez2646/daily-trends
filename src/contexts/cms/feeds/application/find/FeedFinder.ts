import Feed from '../../domain/Feed';
import FeedFinderDomainService from '../../domain/FeedFinderDomainService';
import FeedId from '../../domain/FeedId';

export default class FeedFinder {
  private readonly finder: FeedFinderDomainService;

  constructor(finder: FeedFinderDomainService) {
    this.finder = finder;
  }

  async execute(id: FeedId): Promise<Feed> {
    return this.finder.execute(id);
  }
}
