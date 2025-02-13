import type { Picture } from "../../domain/picture";
import type { UserId } from "../../../user/domain/values/userId.value";
import type { ConversationStore } from "../conversation.store";

export class CreateConversationHandler {
  constructor(conversationStore: ConversationStore) {}

  async handle(picture: Picture, userId: UserId) {}
}
