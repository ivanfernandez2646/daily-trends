import Feed from '../../domain/Feed';
import FeedFinderDomainService from '../../domain/FeedFinderDomainService';
import FeedId from '../../domain/FeedId';
import FeedNotFound from '../../domain/FeedNotFound';
import FeedRepository from '../../domain/FeedRepository';
import FeedScraperDomainService from '../../domain/FeedScraperDomainService';

export default class FeedScraper {
  private readonly repository: FeedRepository;

  private readonly feedScraperDomainService: FeedScraperDomainService;

  private readonly feedFinderDomainService: FeedFinderDomainService;

  constructor(
    repository: FeedRepository,
    feedScraperDomainService: FeedScraperDomainService,
    feedFinderDomainService: FeedFinderDomainService
  ) {
    this.repository = repository;
    this.feedScraperDomainService = feedScraperDomainService;
    this.feedFinderDomainService = feedFinderDomainService;
  }

  async execute(): Promise<void> {
    const feeds = await this.feedScraperDomainService.execute();

    for (let i = 0; i < feeds.length; i++) {
      const feed = feeds[i];

      try {
        await this.feedFinderDomainService.execute(feed.id);
        feeds[i] = Feed.fromPrimitives({ ...feed.toPrimitives(), id: FeedId.random().value });
        i--;
        continue;
      } catch (e) {
        if (e instanceof FeedNotFound) {
          await this.repository.save(feed);
          continue;
        }

        throw e;
      }
    }
  }
}
