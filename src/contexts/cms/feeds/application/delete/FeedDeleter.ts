import FeedFinderDomainService from '../../domain/FeedFinderDomainService';
import FeedId from '../../domain/FeedId';
import FeedRepository from '../../domain/FeedRepository';

export default class FeedDeleter {
  private readonly repository: FeedRepository;

  private readonly finderDomainService: FeedFinderDomainService;

  constructor(repository: FeedRepository, feedFinderDomainService: FeedFinderDomainService) {
    this.repository = repository;
    this.finderDomainService = feedFinderDomainService;
  }

  async execute(id: FeedId): Promise<void> {
    const feed = await this.finderDomainService.execute(id);

    feed.delete();

    return this.repository.delete(feed);
  }
}
