import type { Store } from "../../../framework/applicative/store";
import type { User } from "../domain/user";
import type { Email } from "../domain/values/email.value";

export interface UserStore extends Store<User> {
  loadByEmail(email: Email): Promise<User | undefined>;
}
