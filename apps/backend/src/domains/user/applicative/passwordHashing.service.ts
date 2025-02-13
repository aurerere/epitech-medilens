import type { HashedPassword, Password } from "../domain/values/password";

export interface PasswordHashingService {
  hash(password: Password): Promise<HashedPassword>;

  compare(candidate: Password, hashed: HashedPassword): Promise<boolean>;
}
