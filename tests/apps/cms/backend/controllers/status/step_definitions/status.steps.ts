import { defineFeature, loadFeature } from 'jest-cucumber';
import { thenTheResponseStatusCodeIs, whenISendAGetRequest } from '../../../shared/Controller';
import EnvironmentArranger from '../../../../../../contexts/cms/shared/infrastructure/arranger/EnvironmentArranger';
import { CmsBackendApp } from '../../../../../../../src/apps/cms/backend/CmsBackendApp';
import container from '../../../config';

const feature = loadFeature('tests/apps/cms/backend/controllers/status/status.feature'),
  environmentArrager: Promise<EnvironmentArranger> = container.get('Apps.contexts.cms.shared.EnvironmentArranger');

defineFeature(feature, test => {
  let application: CmsBackendApp;

  beforeAll(async () => {
    application = new CmsBackendApp();
    await application.start();
  });

  beforeEach(async () => {
    await (await environmentArrager).arrange();
  });

  afterAll(async () => {
    await application.stop();
    await (await environmentArrager).close();
  });

  test('Check the api status', ({ when, then }) => {
    whenISendAGetRequest(when);

    thenTheResponseStatusCodeIs(then);
  });
});
