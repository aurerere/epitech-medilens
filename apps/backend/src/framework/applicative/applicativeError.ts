import { HttpError } from "./status";
import { Exception } from "./exception";
import type { Identifiable } from "./store";

import type { AnySerializable, Constructor } from "../types";

export class ApplicativeError {
  static Class = class<E extends HttpError> extends Exception<
    E,
    "ApplicativeError"
  > {
    constructor(
      message: string,
      httpError: E,
      internalData?: Record<string, unknown>,
    ) {
      super(message, httpError, internalData);
    }

    readonly kind = "ApplicativeError";
  };

  static Build<E extends HttpError>(httpError: E) {
    return class extends this.Class<E> {
      constructor(message: string, internalData?: Record<string, unknown>) {
        super(message, httpError, internalData);
      }
    };
  }

  static malformed(
    name: string,
    value: unknown,
  ): InstanceType<(typeof this)["Class"]>;
  // eslint-disable-next-line no-dupe-class-members
  static malformed(
    ctor: Constructor,
    value: unknown,
  ): InstanceType<(typeof this)["Class"]>;
  // eslint-disable-next-line no-dupe-class-members
  static malformed(ctorOrName: Constructor | string, value: unknown) {
    return new this.Class(
      `Invalid ${typeof ctorOrName === "string" ? ctorOrName : ctorOrName.name}`,
      HttpError.BAD_REQUEST,
      {
        received: value,
      },
    );
  }

  static notFound<I extends Identifiable>(ctor: Constructor<I>, id: I["id"]) {
    return new this.Class(
      `${ctor.name} not found with id ${id.serialize()}`,
      HttpError.NOT_FOUND,
    );
  }

  static invalid(...constructors: Constructor<AnySerializable>[]) {
    return new this.Class(
      `Invalid ${constructors.reduce(
        (acc, currentValue, currentIndex) =>
          acc +
          (currentIndex === constructors.length
            ? currentValue.name
            : `${currentValue.name}, `),
        "",
      )}`,
      HttpError.NOT_FOUND,
    );
  }

  static unauthenticated() {
    return new this.Class("Unauthenticated", HttpError.UNAUTHORIZED);
  }

  static conflict<I extends AnySerializable>(ctor: Constructor<I>, value: I) {
    return new this.Class(
      `Already used ${ctor.name} ${value.serialize()}`,
      HttpError.CONFLICT,
      { value: value.serialize() },
    );
  }
}
