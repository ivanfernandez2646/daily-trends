import EventBus from '../../../shared/domain/eventBus/EventBus';
import Feed, { FeedPrimitives } from '../../domain/Feed';
import FeedAlreadyExists from '../../domain/FeedAlreadyExists';
import FeedAuthor from '../../domain/FeedAuthor';
import FeedDescription from '../../domain/FeedDescription';
import FeedFinderDomainService from '../../domain/FeedFinderDomainService';
import FeedId from '../../domain/FeedId';
import FeedNotFound from '../../domain/FeedNotFound';
import FeedRepository from '../../domain/FeedRepository';
import FeedTitle from '../../domain/FeedTitle';

export type FeedCreatorProps = Pick<FeedPrimitives, 'id' | 'title' | 'description' | 'author' | 'source'>;

export default class FeedCreator {
  private readonly repository: FeedRepository;

  private readonly finderDomainService: FeedFinderDomainService;

  private readonly eventBus: EventBus;

  constructor(repository: FeedRepository, finder: FeedFinderDomainService, eventBus: EventBus) {
    this.repository = repository;
    this.finderDomainService = finder;
    this.eventBus = eventBus;
  }

  async execute(props: FeedCreatorProps): Promise<Feed> {
    const id = new FeedId(props.id),
      title = new FeedTitle(props.title),
      description = new FeedDescription(props.description),
      author = new FeedAuthor(props.author);

    await this.ensureFeedDoesntExist(id);

    const feed = Feed.create({ id, title, description, author, source: props.source });

    await this.repository.save(feed);
    await this.eventBus.publish(feed.pullDomainEvents());

    return feed;
  }

  private async ensureFeedDoesntExist(id: FeedId): Promise<void> {
    try {
      await this.finderDomainService.execute(id);
      throw new FeedAlreadyExists(id);
    } catch (e) {
      if (e instanceof FeedNotFound) {
        return;
      }

      throw e;
    }
  }
}
