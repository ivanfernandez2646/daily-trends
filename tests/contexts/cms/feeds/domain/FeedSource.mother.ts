import FeedSource from '../../../../../src/contexts/cms/feeds/domain/FeedSource';

export default class FeedSourceMother {
  static random(): FeedSource {
    return Object.values(FeedSource)[FeedSourceMother.randomValue()] as FeedSource;
  }

  static differentOf(value: FeedSource): FeedSource {
    return Object.values(FeedSource).filter((purchasePaymentStatus: FeedSource) => purchasePaymentStatus !== value)[
      FeedSourceMother.randomValue()
    ];
  }

  private static randomValue(): number {
    return Math.floor(Math.random() * Object.values(FeedSource).length);
  }
}
