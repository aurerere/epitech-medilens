export interface Constructor<T = any, P extends any[] = any[]> {
  new (...args: P): T;
}

export type NullToUndef<T> = T extends null
  ? undefined
  : T extends object
    ? { [K in keyof T]: NullToUndef<T[K]> }
    : T;

export interface AnySerializable {
  serialize(): any;
}
