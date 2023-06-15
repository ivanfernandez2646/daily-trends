import FeedId from './FeedId';

export default class FeedNotFound extends Error {
  constructor(id: FeedId) {
    super(`Feed with id <${id.value}> not found`);
  }
}
