import type { AnySerializable } from "../types";

export interface Handler {
  handle(): Promise<void | AnySerializable>;
}
