import Feed, { FeedPrimitives } from '../../domain/Feed';
import FeedDescription from '../../domain/FeedDescription';
import FeedFinderDomainService from '../../domain/FeedFinderDomainService';
import FeedId from '../../domain/FeedId';
import FeedRepository from '../../domain/FeedRepository';
import FeedTitle from '../../domain/FeedTitle';

export type FeedUpdaterProps = Pick<FeedPrimitives, 'id'> & Partial<Pick<FeedPrimitives, 'title' | 'description'>>;

export default class FeedUpdater {
  private readonly repository: FeedRepository;

  private readonly finderDomainService: FeedFinderDomainService;

  constructor(repository: FeedRepository, finderDomainService: FeedFinderDomainService) {
    this.repository = repository;
    this.finderDomainService = finderDomainService;
  }

  async execute(props: FeedUpdaterProps): Promise<Feed> {
    const id = new FeedId(props.id),
      feed = await this.finderDomainService.execute(id),
      title = props.title ? new FeedTitle(props.title) : undefined,
      description = props.description !== undefined ? new FeedDescription(props.description) : undefined;

    const updatedFeed = feed.update({ title, description });

    if (!updatedFeed) {
      return feed;
    }

    await this.repository.save(updatedFeed);

    return updatedFeed;
  }
}
