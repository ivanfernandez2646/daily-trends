import InvalidArgumentError from '../../../../src/contexts/cms/shared/domain/InvalidArgumentError';
import { Nullable } from '../../../../src/contexts/cms/shared/domain/Nullable';
import RequiredStringValueObject from '../../../../src/contexts/cms/shared/domain/RequiredStringValueObject';
import MotherCreator from './MotherCreator';

class DummyRequiredStringValueObject extends RequiredStringValueObject {}

class DummmyRequiredStringValueObjectMother {
	static create(value: Nullable<string>): DummyRequiredStringValueObject {
		return new DummyRequiredStringValueObject(value as string);
	}

	static random(): DummyRequiredStringValueObject {
		return DummmyRequiredStringValueObjectMother.create(MotherCreator.word());
	}
}

describe('RequiredStringValueObject', () => {
	it('should throw an InvalidArgumentError if value is null', () => {
		expect(() => DummmyRequiredStringValueObjectMother.create(null)).toThrow(InvalidArgumentError);
	});

	it('should throw an InvalidArgumentError if value is an empty string', () => {
		expect(() => DummmyRequiredStringValueObjectMother.create('')).toThrow(InvalidArgumentError);
	});

	describe('equalsTo()', () => {
		it('should return true if two instances have the same value', () => {
			const dummy1 = DummmyRequiredStringValueObjectMother.random(),
				dummy2 = DummmyRequiredStringValueObjectMother.create(dummy1.value);

			expect(dummy1.equalsTo(dummy2)).toBe(true);
		});

		it('should return false if two instances have different values (no sensitive)', () => {
			const dummy1 = DummmyRequiredStringValueObjectMother.create('test'),
				dummy2 = DummmyRequiredStringValueObjectMother.create('TEST');

			expect(dummy1.equalsTo(dummy2)).toBe(false);
		});
	});
});
