import { UserSerializer } from "./user.serializer";

import { KyselyStore } from "../../../framework/infrastructure/store/kysely.store";
import type { User } from "../domain/user";
import type { KyselyInstance } from "../../../framework/infrastructure/store/kysely.types";
import type { UserStore } from "../applicative/user.store";
import type { Email } from "../domain/values/email.value";

export class KyselyUserStore
  extends KyselyStore<User, "user">
  implements UserStore
{
  constructor(db: KyselyInstance) {
    super(db, "user", new UserSerializer());
  }

  loadByEmail(email: Email) {
    return this.findOne(this.query().where("email", "=", email.serialize()));
  }
}
