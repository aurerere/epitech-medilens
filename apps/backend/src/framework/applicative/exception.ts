import { HttpError } from "./status";
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

  static internal(internalData?: Record<string, unknown>) {
    class InternalError extends Exception<HttpError, "InternalError"> {
      readonly kind = "InternalError";

      constructor(internalData?: Record<string, unknown>) {
        super("Internal error", HttpError.INTERNAL, internalData);
      }
    }

    return new InternalError(internalData);
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
