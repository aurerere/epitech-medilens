import type { Constructor } from "../types";

export abstract class Value<T> {
  readonly label: string | undefined;

  constructor(protected readonly value: T) {}

  abstract ensureValidity(): void;

  serialize() {
    return this.value;
  }

  equals(other: this) {
    return this.value === other.value;
  }

  static parse<U extends Value<any>>(this: Constructor<U>, candidate: unknown) {
    const instance = new this(candidate);
    instance.ensureValidity();
    return instance;
  }

  static deserialize<U extends Value<any>>(
    this: Constructor<U>,
    value: ReturnType<U["serialize"]>,
  ) {
    return new this(value);
  }
}
