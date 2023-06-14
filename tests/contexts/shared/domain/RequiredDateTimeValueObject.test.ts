import InvalidArgumentError from '../../../../src/contexts/cms/shared/domain/InvalidArgumentError';
import MotherCreator from './MotherCreator';
import RequiredDateTimeValueObjectMother from './RequiredDateTimeValueObject.mother';

describe('RequiredDateTimeValueObject', () => {
	it('should throw an InvalidArgumentError if value is null', () => {
		expect(() => RequiredDateTimeValueObjectMother.create(null as unknown as string)).toThrow(
			InvalidArgumentError
		);
	});

	it('should throw an InvalidArgumentError if value is an empty DateTime', () => {
		expect(() => RequiredDateTimeValueObjectMother.create('')).toThrow(InvalidArgumentError);
	});

	it('should throw an InvalidArgumentError if value is an invalid date', () => {
		expect(() => RequiredDateTimeValueObjectMother.create(MotherCreator.word())).toThrow(
			InvalidArgumentError
		);
	});

	describe('equalsTo()', () => {
		it('should return true if two instances have the same value', () => {
			const dummy1 = RequiredDateTimeValueObjectMother.random(),
				dummy2 = RequiredDateTimeValueObjectMother.create(dummy1.value);

			expect(dummy1.equalsTo(dummy2)).toBe(true);
		});

		it('should return false if two instances have different values (no sensitive)', () => {
			const dummy1 = RequiredDateTimeValueObjectMother.random(),
				dummy2 = RequiredDateTimeValueObjectMother.differentOf(dummy1);

			expect(dummy1.equalsTo(dummy2)).toBe(false);
		});
	});

	describe('toSeconds()', () => {
		it('should return date in seconds', () => {
			const dummy1 = RequiredDateTimeValueObjectMother.create(MotherCreator.date());

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			expect(dummy1.toSeconds()).toBe(Math.floor(dummy1.toDate()!.getTime() / 1000));
		});
	});
});
