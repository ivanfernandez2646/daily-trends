import { Criteria } from '../../../shared/domain/Criteria';
import Feed, { FeedPrimitives } from '../../domain/Feed';
import FeedRepository from '../../domain/FeedRepository';

export default class FeedSearcher {
  private readonly repository: FeedRepository;

  constructor(repository: FeedRepository) {
    this.repository = repository;
  }

  async execute(criteria?: Criteria<FeedPrimitives>): Promise<Feed[]> {
    return this.repository.search(criteria);
  }
}
