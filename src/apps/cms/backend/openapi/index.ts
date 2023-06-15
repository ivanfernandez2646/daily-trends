import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { Router } from 'express';

export function registerSwagger(router: Router) {
  const swaggerDocument = YAML.load(path.join(__dirname, '../../../../..', '/docs', 'openapi.yml'));

  router.use('/', swaggerUi.serve);
  router.get('/', swaggerUi.setup(swaggerDocument));
}
