import convict from 'convict';
import { accessSync } from 'fs';
import { F_OK } from 'constants';

const config = convict({
    env: {
      doc: 'Environment.',
      format: ['production', 'dev', 'test'],
      env: 'NODE_ENV',
      default: 'dev'
    },
    mongo: {
      url: {
        doc: 'Mongo URL.',
        env: 'MONGO_URL',
        default: 'mongodb://localhost:27017/daily-trends'
      }
    }
  }),
  files: string[] = [];

try {
  const env = config.get('env');

  accessSync(`${__dirname}/${env}.json`, F_OK);
  files.push(`${__dirname}/${env}.json`);
} catch (e) {}

config.loadFile(files);

export default config;
