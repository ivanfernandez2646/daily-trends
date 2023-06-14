import InvalidArgumentError from '../../../../../src/contexts/cms/shared/domain/InvalidArgumentError';
import MotherCreator from '../../shared/domain/MotherCreator';
import FeedIdMother from './FeedId.mother';

describe('FeedId', () => {
	it('should throw an InvalidArgumentError if value is not an uuid', () => {
		expect(() => FeedIdMother.random(MotherCreator.alphaNumeric())).toThrow(InvalidArgumentError);
	});

	it('should create a valid FeedId', () => {
		const randomUuid = MotherCreator.uuid(),
			id = FeedIdMother.random(randomUuid);

		expect(id.value).toEqual(randomUuid);
	});
});
