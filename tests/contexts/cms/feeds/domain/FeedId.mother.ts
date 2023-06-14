import FeedId from '../../../../../src/contexts/cms/feeds/domain/FeedId';
import MotherCreator from '../../shared/domain/MotherCreator';

export default class FeedIdMother {
	static create(value: string): FeedId {
		return new FeedId(value);
	}

	static random(value?: string): FeedId {
		return FeedIdMother.create(value ?? MotherCreator.uuid());
	}
}
