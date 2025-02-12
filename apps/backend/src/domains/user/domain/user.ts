import type { Email } from "./values/email.value";
import type { UserId } from "./values/userId.value";
import type { HashedPassword } from "./values/password";

export class User {
  constructor(
    readonly id: UserId,
    private email: Email,
    private password: HashedPassword,
  ) {}
}
