import { v7 } from "uuid";

import { Primitive } from "./primitive.value";

export function AnyId<const T extends string>(label: T) {
  class AnyId extends Primitive(String, {
    label,
  }) {
    static generate<T extends typeof AnyId>(this: T) {
      return new this(v7()) as InstanceType<T>;
    }
  }

  return AnyId;
}

// eslint-disable-next-line ts/no-redeclare
export type AnyId = InstanceType<ReturnType<typeof AnyId>>;
