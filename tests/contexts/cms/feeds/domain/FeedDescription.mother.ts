import FeedDescription from '../../../../../src/contexts/cms/feeds/domain/FeedDescription';
import { Nullable } from '../../../../../src/contexts/cms/shared/domain/Nullable';
import MotherCreator from '../../shared/domain/MotherCreator';

export default class FeedDescriptionMother {
	static create(value: Nullable<string>): FeedDescription {
		return new FeedDescription(value);
	}

	static random(value?: string): FeedDescription {
		const randomDescription = MotherCreator.randomBoolean()
			? MotherCreator.alphaNumeric(MotherCreator.positiveNumber({ max: 10 }))
			: null;

		return FeedDescriptionMother.create(value !== undefined ? value : randomDescription);
	}

	static differentOf(value: FeedDescription): FeedDescription {
		let newValue: FeedDescription;

		do {
			newValue = FeedDescriptionMother.random();
		} while (newValue.equalsTo(value));

		return newValue;
	}
}
