export interface Constructor<T = any, P extends any[] = any[]> {
  new (...args: P): T;
}

export type NullToUndef<T> = T extends null
  ? undefined
  : T extends object
    ? { [K in keyof T]: NullToUndef<T[K]> }
    : T;

export type JsonObject = {
  [x: string]: JsonValue | undefined;
};

type JsonPrimitive = string | number | boolean | null | undefined;

type JsonArray = JsonValue[];

type JsonValue = JsonPrimitive | JsonArray | JsonObject;

export type AnySerialized = JsonValue;

export type Serialized<T extends AnySerializable> = ReturnType<T["serialize"]>;

export interface AnySerializable {
  serialize(...params: any[]): AnySerialized;
}
