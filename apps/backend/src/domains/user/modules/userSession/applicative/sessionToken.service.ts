import type { SessionId } from "../domain/values/sessionId.value";
import type { SessionToken } from "../domain/values/sessionToken.value";

export interface SessionTokenService {
  sign(sessionId: SessionId): Promise<SessionToken>;

  verify(token: SessionToken): Promise<SessionId | undefined>;
}
