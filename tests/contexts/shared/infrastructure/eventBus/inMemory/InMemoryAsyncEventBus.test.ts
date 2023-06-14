import { randomBytes } from 'crypto';

import DomainEvent from '../../../../../../src/contexts/cms/shared/domain/eventBus/DomainEvent';
import DomainEventSubscriber from '../../../../../../src/contexts/cms/shared/domain/eventBus/DomainEventSubscriber';
import InMemoryAsyncEventBus from '../../../../../../src/contexts/cms/shared/infrastructure/eventBus/inMemory/InMemoryAsyncEventBus';

class DummyEvent extends DomainEvent {
	static EVENT_NAME = 'dummy:event';

	constructor(id: string) {
		super({ eventName: DummyEvent.EVENT_NAME, aggregateId: id });
	}

	toPrimitives(): Record<string, any> {
		throw new Error('Method not implemented.');
	}
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
	subscribedTo(): any[] {
		return [DummyEvent];
	}

	async on(domainEvent: DummyEvent): Promise<void> {
		return new Promise(res => {
			console.log(domainEvent);
			res();
		});
	}
}

describe('inMemoryAsyncEventBus', () => {
	let subscriber: DomainEventSubscriberDummy;
	let eventBus: InMemoryAsyncEventBus;

	it('the subscriber should be called when the event it is subscribed to is published', done => {
		expect.assertions(1);

		const event = new DummyEvent(randomBytes(20).toString('hex'));

		subscriber = new DomainEventSubscriberDummy();

		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		subscriber.on = (_domainEvent: DummyEvent): Promise<void> => {
			expect(true).toBe(true);

			return new Promise(res => {
				done();
				res();
			});
		};

		eventBus = new InMemoryAsyncEventBus();
		eventBus.addSubscribers([subscriber]);

		void eventBus.publish([event]);
	});
});
