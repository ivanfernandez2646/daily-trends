import InvalidArgumentError from '../../../../../src/contexts/cms/shared/domain/InvalidArgumentError';
import DateTimeValueObjectMother from './DateTimeValueObject.mother';
import MotherCreator from './MotherCreator';
import RequiredDateTimeValueObjectMother from './RequiredDateTimeValueObject.mother';

describe('DateTimeValueObject', () => {
	it('should be able to create a nullable value object', () => {
		expect(DateTimeValueObjectMother.create(null).value).toBeNull();
	});

	it('should throw an InvalidArgumentError if value is an invalid date', () => {
		expect(() => RequiredDateTimeValueObjectMother.create(MotherCreator.word())).toThrow(
			InvalidArgumentError
		);
	});

	describe('equalsTo()', () => {
		it('should return true if two instances have the same value', () => {
			const dummy1 = DateTimeValueObjectMother.random(),
				dummy2 = DateTimeValueObjectMother.create(dummy1.value);

			expect(dummy1.equalsTo(dummy2)).toBe(true);
		});

		it('should return false if two instances have different values (no sensitive)', () => {
			const dummy1 = DateTimeValueObjectMother.random(),
				dummy2 = DateTimeValueObjectMother.differentOf(dummy1);

			expect(dummy1.equalsTo(dummy2)).toBe(false);
		});
	});

	describe('toSeconds()', () => {
		it('should return date in seconds', () => {
			const dummy1 = DateTimeValueObjectMother.create(MotherCreator.date());

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			expect(dummy1.toSeconds()).toBe(Math.floor(dummy1.toDate()!.getTime() / 1000));
		});

		it('should return null if date value is null', () => {
			const dummy1 = DateTimeValueObjectMother.create(null);

			expect(dummy1.toSeconds()).toBeNull();
		});
	});
});
