import { User } from "../domain/user";
import type { Serialized } from "../../../framework/types";
import { UserId } from "../domain/values/userId.value";
import { Email } from "../domain/values/email.value";
import { HashedPassword } from "../domain/values/password";

export class UserSerializer {
  serialize(user: User) {
    return {
      id: user.id.serialize(),
      email: user.getEmail().serialize(),
      password: user.getPassword().serialize(),
    };
  }

  deserialize(serialized: Serialized<this>) {
    return new User(
      UserId.deserialize(serialized.id),
      Email.deserialize(serialized.email),
      HashedPassword.deserialize(serialized.password),
    );
  }
}
