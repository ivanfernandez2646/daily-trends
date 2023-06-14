import AggregateRoot from '../../shared/domain/AggregateRoot';
import DateTimeValueObject from '../../shared/domain/DateTimeValueObject';
import { Nullable } from '../../shared/domain/Nullable';
import RequiredDateTimeValueObject from '../../shared/domain/RequiredDateTimeValueObject';
import FeedAuthor from './FeedAuthor';
import FeedCreatedDomainEvent from './FeedCreatedDomainEvent';
import FeedDescription from './FeedDescription';
import FeedId from './FeedId';
import FeedTitle from './FeedTitle';

export type FeedPrimitives = {
	id: string;
	title: string;
	description: Nullable<string>;
	author: string;
	createdAt: string;
	updatedAt: Nullable<string>;
};

export default class Feed extends AggregateRoot {
	readonly id: FeedId;

	readonly title: FeedTitle;

	readonly description: FeedDescription;

	readonly author: FeedAuthor;

	readonly createdAt: RequiredDateTimeValueObject;

	readonly updatedAt: DateTimeValueObject;

	constructor({
		id,
		title,
		description,
		author,
		createdAt,
		updatedAt
	}: {
		id: FeedId;
		title: FeedTitle;
		description: FeedDescription;
		author: FeedAuthor;
		createdAt: RequiredDateTimeValueObject;
		updatedAt: DateTimeValueObject;
	}) {
		super();

		this.id = id;
		this.title = title;
		this.description = description;
		this.author = author;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	static create({
		id,
		title,
		description,
		author
	}: {
		id: FeedId;
		title: FeedTitle;
		description: FeedDescription;
		author: FeedAuthor;
	}): Feed {
		const feed = new Feed({
			id,
			title,
			description,
			author,
			createdAt: RequiredDateTimeValueObject.now(),
			updatedAt: new DateTimeValueObject(null)
		});

		feed.record(
			new FeedCreatedDomainEvent({ aggregateId: feed.id.value, title: feed.title.value })
		);

		return feed;
	}

	static fromPrimitives(plainData: FeedPrimitives): Feed {
		const { id, title, description, author, createdAt, updatedAt } = plainData;

		return new Feed({
			id: new FeedId(id),
			title: new FeedTitle(title),
			description: new FeedDescription(description),
			author: new FeedAuthor(author),
			createdAt: new RequiredDateTimeValueObject(createdAt),
			updatedAt: new DateTimeValueObject(updatedAt)
		});
	}

	toPrimitives(): FeedPrimitives {
		return {
			id: this.id.value,
			title: this.title.value,
			description: this.description.value,
			author: this.author.value,
			createdAt: this.createdAt.value,
			updatedAt: this.updatedAt.value
		};
	}
}
