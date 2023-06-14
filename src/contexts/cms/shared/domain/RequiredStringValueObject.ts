import InvalidArgumentError from './InvalidArgumentError';
import StringValueObject from './StringValueObject';

export default abstract class RequiredStringValueObject extends StringValueObject {
	constructor(value: string) {
		RequiredStringValueObject.ensureIsValidRequiredString(value);

		super(value);
	}

	public get value(): string {
		return super.value as string;
	}

	private static ensureIsValidRequiredString(value: string): void {
		if (!value || value.trim() === '') {
			throw new InvalidArgumentError(
				`<${this.constructor.name}> is mandatory. Current value:  <${value}>`
			);
		}
	}
}
