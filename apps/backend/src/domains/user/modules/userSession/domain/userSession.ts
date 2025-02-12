import type { SessionId } from "./sessionId.value";

import type { UserId } from "../../../domain/userId.value";

export class UserSession {
  constructor(
    readonly id: SessionId,
    readonly userId: UserId,
  ) {}
}
