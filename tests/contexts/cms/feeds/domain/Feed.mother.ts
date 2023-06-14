import Feed from '../../../../../src/contexts/cms/feeds/domain/Feed';
import FeedAuthor from '../../../../../src/contexts/cms/feeds/domain/FeedAuthor';
import FeedDescription from '../../../../../src/contexts/cms/feeds/domain/FeedDescription';
import FeedId from '../../../../../src/contexts/cms/feeds/domain/FeedId';
import FeedTitle from '../../../../../src/contexts/cms/feeds/domain/FeedTitle';
import DateTimeValueObject from '../../../../../src/contexts/cms/shared/domain/DateTimeValueObject';
import RequiredDateTimeValueObject from '../../../../../src/contexts/cms/shared/domain/RequiredDateTimeValueObject';
import DateTimeValueObjectMother from '../../shared/domain/DateTimeValueObject.mother';
import RequiredDateTimeValueObjectMother from '../../shared/domain/RequiredDateTimeValueObject.mother';
import FeedAuthorMother from './FeedAuthor.mother';
import FeedDescriptionMother from './FeedDescription.mother';
import FeedIdMother from './FeedId.mother';
import FeedTitleMother from './FeedTitle.mother';

export default class FeedMother {
	static create(params: {
		id: FeedId;
		title: FeedTitle;
		description: FeedDescription;
		author: FeedAuthor;
		createdAt: RequiredDateTimeValueObject;
		updatedAt: DateTimeValueObject;
	}): Feed {
		return new Feed(params);
	}

	static random(overwrites?: {
		id?: FeedId;
		title?: FeedTitle;
		description?: FeedDescription;
		author?: FeedAuthor;
		createdAt?: RequiredDateTimeValueObject;
		updatedAt?: DateTimeValueObject;
	}): Feed {
		const id = overwrites?.id ?? FeedIdMother.random(),
			title = overwrites?.title ?? FeedTitleMother.random(),
			description =
				overwrites?.description !== undefined
					? overwrites.description
					: FeedDescriptionMother.random(),
			author = overwrites?.author ?? FeedAuthorMother.random(),
			createdAt = overwrites?.createdAt ?? RequiredDateTimeValueObjectMother.random(),
			updatedAt = overwrites?.updatedAt ?? DateTimeValueObjectMother.random();

		return FeedMother.create({ id, title, description, author, createdAt, updatedAt });
	}
}
