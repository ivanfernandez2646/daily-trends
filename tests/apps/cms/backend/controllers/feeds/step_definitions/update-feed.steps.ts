import { defineFeature, loadFeature } from 'jest-cucumber';
import container from '../../../config';
import { CmsBackendApp } from '../../../../../../../src/apps/cms/backend/CmsBackendApp';
import EnvironmentArranger from '../../../../../../contexts/cms/shared/infrastructure/arranger/EnvironmentArranger';
import {
  whenISendAPatchRequestWithBody,
  thenTheResponseStatusCodeIs,
  andTheResponseShouldBe,
  andTheResponseShouldContains
} from '../../../shared/Controller';
import givenThereAreFeeds from '../../../shared/FeedRepository';

const feature = loadFeature('tests/apps/cms/backend/controllers/feeds/update-feed.feature'),
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

  test('When a feed does not exist', ({ when, then, and }) => {
    whenISendAPatchRequestWithBody(when);

    thenTheResponseStatusCodeIs(then);
    andTheResponseShouldBe(and);
  });

  test('When a feed exists', ({ given, when, then, and }) => {
    givenThereAreFeeds(given);

    whenISendAPatchRequestWithBody(when);

    thenTheResponseStatusCodeIs(then);
    andTheResponseShouldContains(and);
  });
});
