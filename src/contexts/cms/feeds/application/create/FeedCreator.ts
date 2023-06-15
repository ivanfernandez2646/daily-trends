import EventBus from '../../../shared/domain/eventBus/EventBus';
import Feed, { FeedPrimitives } from '../../domain/Feed';
import FeedAlreadyExists from '../../domain/FeedAlreadyExists';
import FeedAuthor from '../../domain/FeedAuthor';
import FeedDescription from '../../domain/FeedDescription';
import FeedId from '../../domain/FeedId';
import FeedRepository from '../../domain/FeedRepository';
import FeedTitle from '../../domain/FeedTitle';

export type FeedCreatorProps = Pick<FeedPrimitives, 'id' | 'title' | 'description' | 'author'>;

export default class FeedCreator {
  private readonly repository: FeedRepository;

  private readonly eventBus: EventBus;

  constructor(repository: FeedRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async execute(props: FeedCreatorProps): Promise<Feed> {
    const id = new FeedId(props.id),
      title = new FeedTitle(props.title),
      description = new FeedDescription(props.description),
      author = new FeedAuthor(props.author);

    await this.ensureFeedDoesntExist(id);

    const feed = Feed.create({ id, title, description, author });

    await this.repository.save(feed);
    await this.eventBus.publish(feed.pullDomainEvents());

    return feed;
  }

  private async ensureFeedDoesntExist(id: FeedId): Promise<void> {
    const feed = await this.repository.find(id);

    if (feed) {
      throw new FeedAlreadyExists(feed.id);
    }
  }
}
