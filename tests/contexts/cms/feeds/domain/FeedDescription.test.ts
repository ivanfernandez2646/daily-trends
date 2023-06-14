import FeedDescriptionMother from './FeedDescription.mother';

describe('FeedDescription', () => {
	it('should create a valid FeedDescription', () => {
		const description = FeedDescriptionMother.random();

		expect(description.value).toBeDefined();
	});
});
