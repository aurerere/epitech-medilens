import type { HttpError } from "./status";
import { type ErrorResponseKind, Response } from "./response";

export abstract class Exception<
  E extends HttpError,
  K extends ErrorResponseKind,
> extends Error {
  abstract readonly kind: K;

  protected constructor(
    readonly message: string,
    private readonly httpError: E,
    readonly internalData?: Record<string, unknown>,
  ) {
    super(message);
  }

  toResponse() {
    return new Response<false, E, K>(
      this.httpError,
      this.message,
      this.kind,
      false,
    );
  }
}
