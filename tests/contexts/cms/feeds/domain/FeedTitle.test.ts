import InvalidArgumentError from '../../../../../src/contexts/cms/shared/domain/InvalidArgumentError';
import FeedTitleMother from './FeedTitle.mother';

describe('FeedTitle', () => {
	it('should throw an InvalidArgumentError if value is empty', () => {
		expect(() => FeedTitleMother.random('')).toThrow(InvalidArgumentError);
	});

	it('should create a valid FeedTitle', () => {
		const title = FeedTitleMother.random();

		expect(title.value).toBeDefined();
	});
});
