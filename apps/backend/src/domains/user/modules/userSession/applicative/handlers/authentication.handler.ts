import type { RequestContext } from "../requestContext";
import type { UserSessionStore } from "../userSession.store";
import type { SessionTokenService } from "../sessionToken.service";
import { ApplicativeError } from "../../../../../../framework/applicative/applicativeError";
import { Actor } from "../../../../../../framework/domain/actor";

export class AuthenticationHandler {
  constructor(
    private readonly userSessionStore: UserSessionStore,
    private readonly sessionTokenService: SessionTokenService,
  ) {}

  async handle(requestContext: RequestContext) {
    const sessionToken = requestContext.getSessionToken();

    if (!sessionToken) {
      throw ApplicativeError.unauthenticated();
    }

    const userSessionId = await this.sessionTokenService.verify(sessionToken);

    if (!userSessionId) {
      requestContext.removeSessionToken();
      throw ApplicativeError.unauthenticated();
    }

    const userSession = await this.userSessionStore.load(userSessionId);

    if (!userSession) {
      requestContext.removeSessionToken();
      throw ApplicativeError.unauthenticated();
    }

    return new Actor(userSession.userId);
  }
}
