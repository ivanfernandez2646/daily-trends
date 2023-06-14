import { faker } from '@faker-js/faker';

export default class MotherCreator {
	static uuid(): string {
		return faker.string.uuid();
	}

	static positiveNumber({ min, max }: { min?: number; max?: number }): number {
		return faker.number.int({ min: !min || min < 1 ? 1 : min, max });
	}

	static zeroOrPositiveNumber(max?: number): number {
		return faker.number.int({ min: 0, max });
	}

	static negativeNumber(): number {
		return faker.number.int({ min: -999999, max: -1 });
	}

	static alphaNumeric(length?: number): string {
		return faker.string.alphanumeric(length);
	}

	static word(): string {
		return faker.lorem.word();
	}

	static firstName(): string {
		return faker.person.firstName();
	}

	static randomBoolean(): boolean {
		return faker.datatype.boolean();
	}

	static date(): string {
		return MotherCreator.randomBoolean()
			? faker.date.soon().toISOString()
			: faker.date.recent().toISOString();
	}

	static userName(): string {
		return faker.internet.userName();
	}

	static email(): string {
		return faker.internet.email();
	}
}
