import type { ConversationId } from "./conversationId.value";
import type { Message } from "./message.value";

import type { UserId } from "../../user/domain/values/userId.value";

export class Conversation {
  constructor(
    readonly id: ConversationId,
    private readonly messages: Message[],
    private readonly userId: UserId,
  ) {}
}
