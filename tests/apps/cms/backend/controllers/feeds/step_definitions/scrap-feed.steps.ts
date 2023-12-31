import { defineFeature, loadFeature } from 'jest-cucumber';
import { CmsBackendApp } from '../../../../../../../src/apps/cms/backend/CmsBackendApp';
import container from '../../../config';
import {
  whenISendAGetRequest,
  thenTheResponseStatusCodeIs,
  andTheResponseShouldBeEmpty,
  andTheResponseIsAnArrayWithLength
} from '../../../shared/Controller';
import givenThereAreFeeds from '../../../shared/FeedRepository';
import EnvironmentArranger from '../../../../../../contexts/cms/shared/infrastructure/arranger/EnvironmentArranger';

const feature = loadFeature('tests/apps/cms/backend/controllers/feeds/scrap-feed.feature'),
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

  test('When i scrap from different sources', ({ given, when, then, and }) => {
    givenThereAreFeeds(given);
    whenISendAGetRequest(when);
    thenTheResponseStatusCodeIs(then);
    andTheResponseIsAnArrayWithLength(and);
    whenISendAGetRequest(when);
    thenTheResponseStatusCodeIs(then);
    andTheResponseIsAnArrayWithLength(and);
    whenISendAGetRequest(when);
    thenTheResponseStatusCodeIs(then);
    andTheResponseShouldBeEmpty(and);
    whenISendAGetRequest(when);
    thenTheResponseStatusCodeIs(then);
    andTheResponseIsAnArrayWithLength(and);
    whenISendAGetRequest(then);
    thenTheResponseStatusCodeIs(then);
    andTheResponseIsAnArrayWithLength(and);
  }, 30000);
});
