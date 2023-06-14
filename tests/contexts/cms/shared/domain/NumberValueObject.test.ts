import NumberValueObject from '../../../../../src/contexts/cms/shared/domain/NumberValueObject';
import MotherCreator from './MotherCreator';

class DummyNumberValueObject extends NumberValueObject {}

class DummyNumberValueObjectMother {
	static create(value: number): DummyNumberValueObject {
		return new DummyNumberValueObject(value);
	}

	static random(): DummyNumberValueObject {
		return DummyNumberValueObjectMother.create(MotherCreator.zeroOrPositiveNumber());
	}
}

describe('NumberValueObject', () => {
	describe('equalsTo()', () => {
		it('should return true if two instances have the same value', () => {
			const dummy1 = DummyNumberValueObjectMother.random(),
				dummy2 = DummyNumberValueObjectMother.create(dummy1.value);

			expect(dummy1.equalsTo(dummy2)).toBe(true);
		});

		it('should return false if two instances have different values (no sensitive)', () => {
			const dummy1 = DummyNumberValueObjectMother.create(0),
				dummy2 = DummyNumberValueObjectMother.create(1);

			expect(dummy1.equalsTo(dummy2)).toBe(false);
		});
	});
});
