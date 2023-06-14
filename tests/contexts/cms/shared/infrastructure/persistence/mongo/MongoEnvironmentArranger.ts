import { MongoClient } from 'mongodb';
import EnvironmentArranger from '../../arranger/EnvironmentArranger';

export default class MongoEnvironmentArranger extends EnvironmentArranger {
  private _client: Promise<MongoClient>;

  constructor(client: Promise<MongoClient>) {
    super();

    this._client = client;
  }

  async arrange(): Promise<void> {
    return this.cleanDatabase();
  }

  private async cleanDatabase() {
    const client = await this.client(),
      collections = await client.db().collections();

    await Promise.all(collections.map(collection => client.db().dropCollection(collection.collectionName)));
  }

  async close(): Promise<void> {
    return (await this.client()).close();
  }

  private client(): Promise<MongoClient> {
    return this._client;
  }
}
