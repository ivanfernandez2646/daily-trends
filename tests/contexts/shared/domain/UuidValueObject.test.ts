import MotherCreator from './MotherCreator';
import UuidValueObjectMother from './UuidValueObject.mother';

describe('UuidValueObject', () => {
	describe('equalsTo()', () => {
		it('should return true if two instances have the same value', () => {
			const randomUuid = MotherCreator.uuid(),
				uuid1 = UuidValueObjectMother.create(randomUuid),
				uuid2 = UuidValueObjectMother.create(randomUuid);

			expect(uuid1.equalsTo(uuid2)).toBe(true);
		});

		it('should return false if two instances have different values', () => {
			const randomUuid = MotherCreator.uuid(),
				uuid1 = UuidValueObjectMother.create(randomUuid),
				uuid2 = UuidValueObjectMother.differentOf(UuidValueObjectMother.create(randomUuid));

			expect(uuid1.equalsTo(uuid2)).toBe(false);
		});
	});
});
