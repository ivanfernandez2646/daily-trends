import configConvict from '../../../../../../apps/cms/backend/config/config';
import { MongoConfig } from './MongoClientFactory';

export default class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return configConvict.get('mongo');
  }
}
