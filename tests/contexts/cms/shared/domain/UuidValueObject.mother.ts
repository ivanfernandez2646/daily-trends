import UuidValueObject from '../../../../../src/contexts/cms/shared/domain/UuidValueObject';
import MotherCreator from './MotherCreator';

export default class UuidValueObjectMother {
	static create(value: string): UuidValueObject {
		return new UuidValueObject(value);
	}

	static random(): UuidValueObject {
		return UuidValueObjectMother.create(MotherCreator.uuid());
	}

	static differentOf(value: UuidValueObject): UuidValueObject {
		let randomValue: UuidValueObject;

		do {
			randomValue = UuidValueObjectMother.random();
		} while (randomValue.equalsTo(value));

		return randomValue;
	}
}
