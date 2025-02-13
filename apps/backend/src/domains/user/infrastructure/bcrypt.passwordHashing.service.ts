import { hash, compare } from "bcrypt";

import type { PasswordHashingService } from "../applicative/passwordHashing.service";
import type { Password } from "../domain/values/password";
import { HashedPassword } from "../domain/values/password";

export class BcryptPasswordHashingService implements PasswordHashingService {
  constructor(private readonly saltRoundAmount: number) {}

  async hash(password: Password) {
    return HashedPassword.deserialize(
      await hash(password.serialize(), this.saltRoundAmount),
    );
  }

  async compare(candidate: Password, hashed: HashedPassword) {
    return compare(candidate.serialize(), hashed.serialize());
  }
}
