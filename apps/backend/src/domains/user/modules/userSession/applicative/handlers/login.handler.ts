import type { RequestContext } from "../requestContext";
import { Email } from "../../../../domain/values/email.value";
import { Password } from "../../../../domain/values/password";
import type { UserStore } from "../../../../applicative/user.store";
import { ApplicativeError } from "../../../../../../framework/applicative/applicativeError";
import type { PasswordHashingService } from "../../../../applicative/passwordHashing.service";
import { UserSession } from "../../domain/userSession";
import type { SessionTokenService } from "../sessionToken.service";
import type { UserSessionStore } from "../userSession.store";

export class LoginHandler {
  constructor(
    private readonly userStore: UserStore,
    private readonly passwordHashingService: PasswordHashingService,
    private readonly sessionTokenService: SessionTokenService,
    private readonly userSessionStore: UserSessionStore,
  ) {}

  async handle(
    requestContext: RequestContext,
    email: Email,
    password: Password,
  ) {
    const user = await this.userStore.loadByEmail(email);

    if (!user) {
      throw ApplicativeError.invalid(Email, Password);
    }

    const isPasswordValid = await this.passwordHashingService.compare(
      password,
      user.getPassword(),
    );

    if (!isPasswordValid) {
      throw ApplicativeError.invalid(Email, Password);
    }

    const userSession = UserSession.create(user.id);

    await this.userSessionStore.save(userSession);

    const sessionToken = await this.sessionTokenService.sign(userSession.id);

    requestContext.setSessionToken(sessionToken);
  }
}
