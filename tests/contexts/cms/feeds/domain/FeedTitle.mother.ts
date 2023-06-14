import FeedTitle from '../../../../../src/contexts/cms/feeds/domain/FeedTitle';
import MotherCreator from '../../shared/domain/MotherCreator';

export default class FeedTitleMother {
	static create(value: string): FeedTitle {
		return new FeedTitle(value);
	}

	static random(value?: string): FeedTitle {
		return FeedTitleMother.create(value ?? MotherCreator.word());
	}

	static differentOf(value: FeedTitle): FeedTitle {
		let newValue: FeedTitle;

		do {
			newValue = FeedTitleMother.random();
		} while (newValue.equalsTo(value));

		return newValue;
	}
}
