/* eslint-disable no-use-before-define */
import RequiredDateTimeValueObject from '../RequiredDateTimeValueObject';
import UuidValueObject from '../UuidValueObject';

export type DomainEventClass = {
	EVENT_NAME: string;
	fromPrimitives(params: {
		aggregateId: string;
		eventId: string;
		attributes: DomainEventAttributes;
		occurredOn: Date;
	}): DomainEvent;
};

type DomainEventAttributes = any;

export default abstract class DomainEvent {
	static readonly EVENT_NAME: string;

	static fromPrimitives: (params: {
		aggregateId: string;
		eventId: string;
		attributes: DomainEventAttributes;
		occurredOn: Date;
	}) => DomainEvent;

	readonly eventId: string;

	readonly eventName: string;

	readonly aggregateId: string;

	readonly occurredOn: Date;

	constructor(params: {
		eventName: string;
		aggregateId: string;
		eventId?: string;
		occurredOn?: Date;
	}) {
		const { eventName, aggregateId, eventId, occurredOn } = params;

		this.eventName = eventName;
		this.aggregateId = aggregateId;
		this.eventId = eventId ?? UuidValueObject.random().value;
		this.occurredOn = occurredOn ?? RequiredDateTimeValueObject.now().toDate();
	}

	abstract toPrimitives(): DomainEventAttributes;
}
