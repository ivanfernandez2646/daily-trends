import DomainEvent from '../../shared/domain/eventBus/DomainEvent';

type FeedCreatedDomainEventAttributes = {
	readonly title: string;
};

export default class FeedCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'feed.created';

	readonly title: string;

	constructor({
		aggregateId,
		title,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		title: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		super({ eventName: FeedCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });

		this.title = title;
	}

	static fromPrimitives(params: {
		aggregateId: string;
		eventId: string;
		attributes: FeedCreatedDomainEventAttributes;
		occurredOn: Date;
	}): FeedCreatedDomainEvent {
		const { aggregateId, eventId, attributes, occurredOn } = params;

		return new FeedCreatedDomainEvent({
			aggregateId,
			eventId,
			title: attributes.title,
			occurredOn
		});
	}

	toPrimitives(): FeedCreatedDomainEventAttributes {
		const { title } = this;

		return { title };
	}
}
