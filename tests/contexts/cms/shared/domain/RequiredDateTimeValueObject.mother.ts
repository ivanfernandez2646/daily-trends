import RequiredDateTimeValueObject from '../../../../../src/contexts/cms/shared/domain/RequiredDateTimeValueObject';
import MotherCreator from './MotherCreator';

export default class RequiredDateTimeValueObjectMother {
	static create(value: string): RequiredDateTimeValueObject {
		return new RequiredDateTimeValueObject(value);
	}

	static random(): RequiredDateTimeValueObject {
		return RequiredDateTimeValueObjectMother.create(MotherCreator.date());
	}

	static now(): RequiredDateTimeValueObject {
		return RequiredDateTimeValueObject.now();
	}

	static differentOf(value: RequiredDateTimeValueObject): RequiredDateTimeValueObject {
		let newValue: RequiredDateTimeValueObject;

		do {
			newValue = RequiredDateTimeValueObjectMother.random();
		} while (newValue.equalsTo(value));

		return newValue;
	}
}
