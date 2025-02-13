import type { UserId } from "../../domains/user/domain/values/userId.value";

export class Actor {
  constructor(readonly userId: UserId) {}
}
