import { Email } from "../../domain/values/email.value";
import type { Password } from "../../domain/values/password";
import type { UserStore } from "../user.store";
import type { PasswordHashingService } from "../passwordHashing.service";
import { ApplicativeError } from "../../../../framework/applicative/applicativeError";
import { User } from "../../domain/user";

export class RegisterHandler {
  constructor(
    private readonly userStore: UserStore,
    private readonly passwordHashingService: PasswordHashingService,
  ) {}

  async handle(email: Email, password: Password) {
    const userWithProvidedEmail = await this.userStore.loadByEmail(email);

    if (userWithProvidedEmail) {
      throw ApplicativeError.conflict(Email, email);
    }

    const hashedPassword = await this.passwordHashingService.hash(password);

    const user = User.create(email, hashedPassword);

    await this.userStore.save(user);
  }
}
