/* eslint-disable @typescript-eslint/no-misused-promises */
import { EventEmitter } from 'stream';

import DomainEvent from '../../../domain/eventBus/DomainEvent';
import DomainEventSubscriber from '../../../domain/eventBus/DomainEventSubscriber';
import EventBus from '../../../domain/eventBus/EventBus';

export default class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
	async publish(events: DomainEvent[]): Promise<void> {
		// eslint-disable-next-line no-promise-executor-return
		return new Promise(res => {
			events.map(event => this.emit(event.eventName, event));
			res();
		});
	}

	addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
		subscribers.forEach(subscriber => {
			subscriber
				.subscribedTo()
				.map(event => this.on(event.EVENT_NAME, subscriber.on.bind(subscriber)));
		});
	}
}
