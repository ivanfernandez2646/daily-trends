import { Collection, MongoClient, ObjectId } from 'mongodb';
import AggregateRoot from '../../../domain/AggregateRoot';
import { Criteria } from '../../../domain/Criteria';

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<MongoClient>) {}

  protected abstract collectionName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: id,
      id: undefined
    };

    await collection.updateOne({ _id: id as unknown as ObjectId }, { $set: document }, { upsert: true });
  }

  protected async byId(id: string, fromPrimitives: (plainData: any) => T) {
    const collection = await this.collection(),
      records = await collection.find({ _id: id as unknown as ObjectId }).toArray();

    if (records.length === 0) {
      return null;
    }

    return fromPrimitives({ ...records[0], id: records[0]._id });
  }

  protected async remove(id: string): Promise<void> {
    const collection = await this.collection();

    await collection.deleteOne({ _id: id as unknown as ObjectId });
  }

  protected async byCriteria(criteria: Criteria<any>, fromPrimitives: (plainData: any) => T): Promise<T[]> {
    const collection = await this.collection(),
      records = await collection
        .find(this.parseCriteria(criteria))
        .sort((criteria?.sort as any) ?? {})
        .limit(criteria.limit ?? 0)
        .toArray();

    return records.map(r => fromPrimitives({ ...r, id: r._id }));
  }

  private parseCriteria(criteria: Criteria<any>) {
    return { $or: criteria.filter };
  }
}
