import Feed from '../../../../../src/contexts/cms/feeds/domain/Feed';
import FeedCreatedDomainEvent from '../../../../../src/contexts/cms/feeds/domain/FeedCreatedDomainEvent';

export default class FeedCreatedDomainEventMother {
  static create(params: {
    aggregateId: string;
    title: string;
    eventId?: string;
    occurredOn?: Date;
  }): FeedCreatedDomainEvent {
    return new FeedCreatedDomainEvent(params);
  }

  static fromFeed(feed: Feed): FeedCreatedDomainEvent {
    return FeedCreatedDomainEventMother.create({
      aggregateId: feed.id.value,
      title: feed.title.value
    });
  }
}
