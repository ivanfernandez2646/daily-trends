import { Nullable } from '../../../../src/contexts/cms/shared/domain/Nullable';
import StringValueObject from '../../../../src/contexts/cms/shared/domain/StringValueObject';
import MotherCreator from './MotherCreator';

class DummyStringValueObject extends StringValueObject {}

class DummyStringValueObjectMother {
	static create(value: Nullable<string>): DummyStringValueObject {
		return new DummyStringValueObject(value);
	}

	static random(): DummyStringValueObject {
		return DummyStringValueObjectMother.create(
			MotherCreator.randomBoolean() ? MotherCreator.word() : null
		);
	}
}

describe('StringValueObject', () => {
	it('should be able to create a nullable value object', () => {
		expect(DummyStringValueObjectMother.create(null).value).toBeNull();
	});

	describe('equalsTo()', () => {
		it('should return true if two instances have the same value', () => {
			const dummy1 = DummyStringValueObjectMother.random(),
				dummy2 = DummyStringValueObjectMother.create(dummy1.value);

			expect(dummy1.equalsTo(dummy2)).toBe(true);
		});

		it('should return false if two instances have different values (no sensitive)', () => {
			const dummy1 = DummyStringValueObjectMother.create('test'),
				dummy2 = DummyStringValueObjectMother.create('TEST');

			expect(dummy1.equalsTo(dummy2)).toBe(false);
		});
	});
});
