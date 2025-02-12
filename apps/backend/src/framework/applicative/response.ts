import { type HttpError, HttpOk } from "./status";

export type ErrorResponseKind =
  | "DomainError"
  | "InternalError"
  | "ApplicativeError";

export type ResponseKind = ErrorResponseKind | "OkResponse";

export class Response<
  O extends boolean,
  S extends HttpOk | HttpError = HttpOk,
  K extends ResponseKind = "OkResponse",
  D extends Record<string, unknown> | undefined | unknown = unknown,
> {
  constructor(
    private readonly http: S,
    private readonly message: string,
    private readonly kind: K,
    private readonly ok: O,
    private readonly data?: D,
  ) {}

  static ok(message: string) {
    return new Response(HttpOk.OK, message, "OkResponse", true);
  }

  get httpStatus() {
    return this.http.status;
  }

  serialize() {
    return {
      ok: this.ok,
      type: this.kind,
      status: this.http.status as S["status"],
      code: this.http.code as S["code"],
      message: this.message,
      data: this.data as D,
    };
  }
}
