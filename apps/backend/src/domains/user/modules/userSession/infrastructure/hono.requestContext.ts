import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { Context } from "hono";

import type { RequestContext } from "../applicative/requestContext";
import { SessionToken } from "../domain/values/sessionToken.value";

export class HonoRequestContext implements RequestContext {
  constructor(private readonly context: Context) {}

  getSessionToken() {
    const cookie = getCookie(this.context, "session");

    if (!cookie) {
      return undefined;
    }

    return SessionToken.parse(cookie);
  }

  removeSessionToken() {
    deleteCookie(this.context, "session");
  }

  setSessionToken(sessionJwt: SessionToken) {
    setCookie(this.context, "session", sessionJwt.serialize(), {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 34560000,
      path: "/",
    });
  }
}
