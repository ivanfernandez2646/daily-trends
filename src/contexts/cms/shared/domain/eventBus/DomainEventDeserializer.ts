import DomainEvent, { DomainEventClass } from './DomainEvent';
import DomainEventSubscriber from './DomainEventSubscriber';

type DomainEventJSON = {
	type: string;
	aggregateId: string;
	attributes: string;
	id: string;
	occurredOn: string;
};

export default class DomainEventDeserializer extends Map<string, DomainEventClass> {
	static configure(subscribers: DomainEventSubscriber<any>[]): DomainEventDeserializer {
		const mapping = new DomainEventDeserializer();
		subscribers.forEach(subscriber => {
			subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping));
		});

		return mapping;
	}

	deserialize(event: string): DomainEvent {
		const eventData = JSON.parse(event).data as DomainEventJSON;
		const { type, aggregateId, attributes, id, occurredOn } = eventData;
		const eventClass = super.get(type);

		if (!eventClass) {
			throw Error(`DomainEvent mapping not found for event ${type}`);
		}

		return eventClass.fromPrimitives({
			aggregateId,
			attributes,
			occurredOn: new Date(occurredOn),
			eventId: id
		});
	}

	private registerEvent(domainEvent: DomainEventClass) {
		const eventName = domainEvent.EVENT_NAME;
		this.set(eventName, domainEvent);
	}
}
