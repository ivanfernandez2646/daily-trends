import FeedAuthor from '../../../../../src/contexts/cms/feeds/domain/FeedAuthor';
import MotherCreator from '../../shared/domain/MotherCreator';

export default class FeedAuthorMother {
	static create(value: string): FeedAuthor {
		return new FeedAuthor(value);
	}

	static random(value?: string): FeedAuthor {
		return FeedAuthorMother.create(value ?? MotherCreator.firstName());
	}

	static differentOf(value: FeedAuthor): FeedAuthor {
		let newValue: FeedAuthor;

		do {
			newValue = FeedAuthorMother.random();
		} while (newValue.equalsTo(value));

		return newValue;
	}
}
