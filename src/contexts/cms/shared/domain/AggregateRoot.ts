import DomainEvent from './eventBus/DomainEvent';

type AggregateRootPrimitives = any;

export default abstract class AggregateRoot {
  // eslint-disable-next-line no-use-before-define
  static fromPrimitives: (plainData: AggregateRootPrimitives) => AggregateRoot;

  static equalsTo: (other: AggregateRoot) => boolean;

  protected readonly domainEvents: DomainEvent[];

  constructor() {
    this.domainEvents = [];
  }

  abstract toPrimitives(): AggregateRootPrimitives;

  record(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  pullDomainEvents(): DomainEvent[] {
    return this.domainEvents.splice(0);
  }
}
