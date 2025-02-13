import { LoginHandler } from "./modules/userSession/applicative/handlers/login.handler";
import { KyselyUserStore } from "./infrastructure/kysely.user.store";
import { BcryptPasswordHashingService } from "./infrastructure/bcrypt.passwordHashing.service";
import { HonoSessionTokenService } from "./modules/userSession/infrastructure/hono.sessionToken.service";
import { KyselyUserSessionStore } from "./modules/userSession/infrastructure/kysely.userSession.store";
import { RegisterHandler } from "./applicative/handlers/register.handler";
import { AuthenticationHandler } from "./modules/userSession/applicative/handlers/authentication.handler";

import { db } from "../../boot/db";
import { Environment } from "../../framework/infrastructure/environment";

export function bootUser() {
  const userStore = new KyselyUserStore(db);
  const userSessionStore = new KyselyUserSessionStore(db);
  const passwordHashingService = new BcryptPasswordHashingService(
    Number(Environment.get("SALT_ROUNDS_AMOUNT")),
  );
  const sessionTokenService = new HonoSessionTokenService(
    Environment.get("JWT_PRIVATE_KEY"),
    Environment.get("JWT_PUBLIC_KEY"),
    Environment.get("JWT_SIGN_ALG") as any,
  );

  const registerHandler = new RegisterHandler(
    userStore,
    passwordHashingService,
  );

  const loginHandler = new LoginHandler(
    userStore,
    passwordHashingService,
    sessionTokenService,
    userSessionStore,
  );

  const authenticationHandler = new AuthenticationHandler(
    userSessionStore,
    sessionTokenService,
  );

  return { loginHandler, registerHandler, authenticationHandler };
}
