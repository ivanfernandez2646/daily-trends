import DateTimeValueObject from '../../../../src/contexts/cms/shared/domain/DateTimeValueObject';
import { Nullable } from '../../../../src/contexts/cms/shared/domain/Nullable';
import MotherCreator from './MotherCreator';

export default class DateTimeValueObjectMother {
	static create(value: Nullable<string>): DateTimeValueObject {
		return new DateTimeValueObject(value);
	}

	static random(): DateTimeValueObject {
		return DateTimeValueObjectMother.create(
			MotherCreator.randomBoolean() ? MotherCreator.date() : null
		);
	}

	static differentOf(value: DateTimeValueObject): DateTimeValueObject {
		let newValue: DateTimeValueObject;

		do {
			newValue = DateTimeValueObjectMother.random();
		} while (newValue.equalsTo(value));

		return newValue;
	}
}
