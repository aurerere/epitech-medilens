import { Value } from "./value";

import { ApplicativeError } from "../applicative/applicativeError";

interface StringOptions {
  validationRegex?: RegExp;
  label: string;
}

interface NumberOptions {
  label: string;
}

function validateString(value: unknown, options: StringOptions) {
  const { label, validationRegex } = options;

  if (typeof value !== "string") {
    throw ApplicativeError.malformed(label, value);
  }

  let sanitizedValue = value;

  if (validationRegex) {
    if (!validationRegex.test(value)) {
      throw ApplicativeError.malformed(label, value);
    }
  }

  return sanitizedValue as string;
}

function validateNumber(value: unknown, options: NumberOptions) {
  const { label } = options;

  if (typeof value !== "number") {
    throw ApplicativeError.malformed(label, value);
  }

  return value as number;
}

type PrimitiveCtor = typeof String | typeof Number;

type PrimitiveType<T extends PrimitiveCtor> = T extends typeof String
  ? string
  : number;

type Options<T extends PrimitiveCtor> = T extends typeof String
  ? StringOptions
  : NumberOptions;

export function Primitive<
  Ctor extends PrimitiveCtor,
  const Label extends string,
>(
  of: Ctor,
  options: Options<Ctor> & {
    label: Label;
  },
) {
  abstract class Primitive extends Value<PrimitiveType<Ctor>> {
    readonly label: Label = options.label;

    ensureValidity() {
      switch (of) {
        case String:
          return validateString(this.value, options);
        case Number:
          return validateNumber(this.value, options);
      }
    }
  }

  return Primitive;
}
