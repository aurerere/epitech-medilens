import type { Email } from "./values/email.value";
import { UserId } from "./values/userId.value";
import type { HashedPassword } from "./values/password";

export class User {
  constructor(
    readonly id: UserId,
    private email: Email,
    private password: HashedPassword,
  ) {}

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  static create(email: Email, password: HashedPassword) {
    return new User(UserId.generate(), email, password);
  }
}
