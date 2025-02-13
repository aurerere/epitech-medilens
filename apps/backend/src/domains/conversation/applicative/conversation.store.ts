import type { Store } from "../../../framework/applicative/store";
import type { Conversation } from "../domain/conversation";
import type { UserId } from "../../user/domain/values/userId.value";
import type { ConversationId } from "../domain/values/conversationId.value";

export interface ConversationStore extends Store<Conversation> {
  loadByUserId(
    userId: UserId,
    startAfter: ConversationId,
  ): Promise<Conversation[]>;
}
