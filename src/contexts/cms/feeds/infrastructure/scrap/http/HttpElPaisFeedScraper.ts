import FeedMother from '../../../../../../../tests/contexts/cms/feeds/domain/Feed.mother';
import FeedTitleMother from '../../../../../../../tests/contexts/cms/feeds/domain/FeedTitle.mother';
import Feed from '../../../domain/Feed';
import { FeedScrap } from '../../../domain/FeedScrap';

export default class HttpElPaisFeedScraper implements FeedScrap {
  scrap(): Promise<Feed[]> {
    return new Promise(res => {
      res([Feed.create(FeedMother.random({ title: FeedTitleMother.create('El Pais') }))]);
    });
  }
}
