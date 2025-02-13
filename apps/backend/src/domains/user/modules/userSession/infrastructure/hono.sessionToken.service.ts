import { sign, verify } from "hono/jwt";

import type { SessionTokenService } from "../applicative/sessionToken.service";
import { SessionId } from "../domain/values/sessionId.value";
import { SessionToken } from "../domain/values/sessionToken.value";

export class HonoSessionTokenService implements SessionTokenService {
  constructor(
    private readonly privateKey: string,
    private readonly publicKey: string,
    private readonly algorithm:
      | "HS256"
      | "HS384"
      | "HS512"
      | "RS256"
      | "RS384"
      | "RS512"
      | "PS256"
      | "PS384"
      | "PS512"
      | "ES256"
      | "ES384"
      | "ES512"
      | "EdDSA",
  ) {}

  async sign(sessionId: SessionId) {
    const serializedId = sessionId.serialize();
    const token = await sign(
      { sessionId: serializedId },
      this.privateKey,
      this.algorithm,
    );

    return new SessionToken(token);
  }

  async verify(jwt: SessionToken) {
    const token = jwt.serialize();

    try {
      const payload = await verify(token, this.publicKey, this.algorithm);

      return SessionId.parse(payload.sessionId);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
