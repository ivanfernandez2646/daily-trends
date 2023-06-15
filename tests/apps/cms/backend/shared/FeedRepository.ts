import { DefineStepFunction } from 'jest-cucumber';
import FeedRepository from '../../../../../src/contexts/cms/feeds/domain/FeedRepository';
import FeedMother from '../../../../contexts/cms/feeds/domain/Feed.mother';
import FeedDescriptionMother from '../../../../contexts/cms/feeds/domain/FeedDescription.mother';
import RequiredDateTimeValueObjectMother from '../../../../contexts/cms/shared/domain/RequiredDateTimeValueObject.mother';
import DateTimeValueObjectMother from '../../../../contexts/cms/shared/domain/DateTimeValueObject.mother';
import container from '../config';
import { Nullable } from '../../../../../src/contexts/cms/shared/domain/Nullable';

const repository: FeedRepository = container.get('Apps.cms.contexts.feeds.FeedRepository');

const givenThereAreFeeds = (given: DefineStepFunction) => {
  given(
    /There are feeds:/,
    async (
      feeds: Array<{
        id: string;
        title: string;
        description?: Nullable<string>;
        author: string;
        createdAt?: string;
        updatedAt?: Nullable<string>;
      }>
    ) => {
      await Promise.all(
        feeds.map(feed =>
          repository.save(
            FeedMother.fromPrimitives({
              ...feed,
              description: feed.description ?? FeedDescriptionMother.random().value,
              createdAt: feed.createdAt ?? RequiredDateTimeValueObjectMother.now().value,
              updatedAt: DateTimeValueObjectMother.random().value
            })
          )
        )
      );
    }
  );
};

export default givenThereAreFeeds;
