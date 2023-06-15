import FeedId from './FeedId';

export default class FeedAlreadyExists extends Error {
  constructor(id: FeedId) {
    super(`Feed with id <${id.value}> already exists`);
  }
}
