import type { SessionToken } from "../domain/values/sessionToken.value";

export interface RequestContext {
  getSessionToken(): SessionToken | undefined;

  removeSessionToken(): void;

  setSessionToken(sessionToken: SessionToken): void;
}
