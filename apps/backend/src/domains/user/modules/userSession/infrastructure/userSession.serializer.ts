import { UserSession } from "../domain/userSession";
import type { Serialized } from "../../../../../framework/types";
import { SessionId } from "../domain/values/sessionId.value";
import { UserId } from "../../../domain/values/userId.value";

export class UserSessionSerializer {
  serialize(userSession: UserSession) {
    return {
      id: userSession.id.serialize(),
      userId: userSession.userId.serialize(),
    };
  }

  deserialize(serialized: Serialized<this>) {
    return new UserSession(
      SessionId.deserialize(serialized.id),
      UserId.deserialize(serialized.userId),
    );
  }
}
