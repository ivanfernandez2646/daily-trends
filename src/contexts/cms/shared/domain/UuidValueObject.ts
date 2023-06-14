import { v4, validate } from 'uuid';

import InvalidArgumentError from './InvalidArgumentError';
import RequiredStringValueObject from './RequiredStringValueObject';

export default class UuidValueObject extends RequiredStringValueObject {
	constructor(value: string) {
		UuidValueObject.ensureIsValidUuid(value);

		super(value);
	}

	static random(): UuidValueObject {
		return new UuidValueObject(v4());
	}

	private static ensureIsValidUuid(id: string): void {
		if (!validate(id)) {
			throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
		}
	}

	equalsTo(other: UuidValueObject): boolean {
		return this.value === other.value;
	}
}
