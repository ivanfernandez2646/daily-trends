import DomainEvent from './DomainEvent';
import DomainEventSubscriber from './DomainEventSubscriber';

export default interface EventBus {
  publish(events: DomainEvent[]): Promise<void>;

  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void;
  // eslint-disable-next-line semi
}
