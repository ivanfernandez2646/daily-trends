import InvalidArgumentError from '../../../../../src/contexts/cms/shared/domain/InvalidArgumentError';
import FeedAuthorMother from './FeedAuthor.mother';

describe('FeedAuthor', () => {
	it('should throw an InvalidArgumentError if value is empty', () => {
		expect(() => FeedAuthorMother.random('')).toThrow(InvalidArgumentError);
	});

	it('should create a valid FeedAuthor', () => {
		const author = FeedAuthorMother.random();

		expect(author.value).toBeDefined();
	});
});
