import Feed from './Feed';

export interface FeedScrap {
  scrap(): Promise<Feed[]>;
}
