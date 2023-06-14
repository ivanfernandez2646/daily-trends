import { Nullable } from './Nullable';

export default abstract class StringValueObject {
	private readonly _value: Nullable<string>;

	constructor(value: Nullable<string>) {
		this._value = value;
	}

	public get value(): Nullable<string> {
		return this._value;
	}

	equalsTo(other: StringValueObject): boolean {
		return this.value === other.value;
	}
}
