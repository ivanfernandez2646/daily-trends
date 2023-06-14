import DomainEvent, { DomainEventClass } from './DomainEvent';

export default interface DomainEventSubscriber<T extends DomainEvent> {
	subscribedTo(): DomainEventClass[];

	on(domainEvent: T): Promise<void>;
}
