import { ConversationSerializer } from "./conversation.serializer";

import { KyselyStore } from "../../../framework/infrastructure/store/kysely.store";
import type { Conversation } from "../domain/conversation";
import type { KyselyInstance } from "../../../framework/infrastructure/store/kysely.types";

export class KyselyConversationStore extends KyselyStore<
  Conversation,
  "conversation"
> {
  constructor(db: KyselyInstance) {
    super(db, "conversation", new ConversationSerializer());
  }
}
