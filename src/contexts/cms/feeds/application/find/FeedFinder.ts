import { Nullable } from '../../../shared/domain/Nullable';
import Feed from '../../domain/Feed';
import FeedFinderDomainService from '../../domain/FeedFinderDomainService';
import FeedId from '../../domain/FeedId';

export default class FeedFinder {
  private readonly finder: FeedFinderDomainService;

  constructor(finder: FeedFinderDomainService) {
    this.finder = finder;
  }

  async execute(id: FeedId): Promise<Nullable<Feed>> {
    return this.finder.execute(id);
  }
}
