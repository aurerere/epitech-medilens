import { SessionId } from "./values/sessionId.value";

import type { UserId } from "../../../domain/values/userId.value";

export class UserSession {
  constructor(
    readonly id: SessionId,
    readonly userId: UserId,
  ) {}

  static create(userId: UserId) {
    return new UserSession(SessionId.generate(), userId);
  }
}
