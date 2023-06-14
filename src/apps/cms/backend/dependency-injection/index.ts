import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV ?? 'dev';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
loader.load(`${__dirname}/application_${env}.yaml`);

export default container;
