import moment from 'moment';

import DateTimeValueObject from './DateTimeValueObject';
import InvalidArgumentError from './InvalidArgumentError';

export default class RequiredDateTimeValueObject extends DateTimeValueObject {
	constructor(value: string) {
		RequiredDateTimeValueObject.ensureIsValidRequiredDateTime(value);

		super(value);
	}

	public get value(): string {
		return super.value as string;
	}

	static now(): RequiredDateTimeValueObject {
		return super.now() as RequiredDateTimeValueObject;
	}

	private static ensureIsValidRequiredDateTime(value: string) {
		const date = moment(value);

		if (!date.isValid()) {
			throw new InvalidArgumentError(
				`<${this.constructor.name}> doesn't allow the value <${value}>`
			);
		}
	}

	toDate(): Date {
		return super.toDate() as Date;
	}

	toSeconds(): number {
		return super.toSeconds() as number;
	}

	toString(format?: string): string {
		return super.toString(format) as string;
	}
}
