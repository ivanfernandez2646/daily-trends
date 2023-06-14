import moment from 'moment';

import InvalidArgumentError from './InvalidArgumentError';
import { Nullable } from './Nullable';
import StringValueObject from './StringValueObject';

export default class DateTimeValueObject extends StringValueObject {
	constructor(value: Nullable<string>) {
		DateTimeValueObject.ensureIsValidDateTime(value);

		super(value);
	}

	static now(): DateTimeValueObject {
		return new DateTimeValueObject(moment().toISOString());
	}

	private static ensureIsValidDateTime(value: Nullable<string>) {
		if (!value) {
			return;
		}

		const date = moment(value);

		if (!date.isValid()) {
			throw new InvalidArgumentError(
				`<${this.constructor.name}> doesn't allow the value <${value}>`
			);
		}
	}

	toDate(): Nullable<Date> {
		return this.value ? moment(this.value).toDate() : null;
	}

	toSeconds(): Nullable<number> {
		return this.value ? moment(this.value).unix() : null;
	}

	toString(format?: string): Nullable<string> {
		return this.value ? moment(this.value).format(format) : null;
	}
}
