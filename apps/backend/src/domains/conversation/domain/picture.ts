import { v7 } from "uuid";

import { ApplicativeError } from "../../../framework/applicative/applicativeError";

export class Picture {
  constructor(
    readonly type: "image/jpeg" | "image/png",
    readonly data: Buffer<ArrayBufferLike>,
    readonly id: string,
  ) {}

  static parse(type: string, data: Buffer<ArrayBufferLike>) {
    if (type !== "image/jpeg" && type !== "image/png") {
      throw ApplicativeError.malformed("Picture", type);
    }

    return new Picture(type, data, v7());
  }
}
