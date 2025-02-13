import { UserSessionSerializer } from "./userSession.serializer";

import { KyselyStore } from "../../../../../framework/infrastructure/store/kysely.store";
import type { UserSession } from "../domain/userSession";
import type { UserSessionStore } from "../applicative/userSession.store";
import type { KyselyInstance } from "../../../../../framework/infrastructure/store/kysely.types";

export class KyselyUserSessionStore
  extends KyselyStore<UserSession, "userSession">
  implements UserSessionStore
{
  constructor(db: KyselyInstance) {
    super(db, "userSession", new UserSessionSerializer());
  }
}
