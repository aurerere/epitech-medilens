import { ConversationId } from "./values/conversationId.value";
import { Message } from "./values/message.value";
import type { DrugName } from "./values/drugName.value";
import type { StoredFileUrl } from "./values/storedFileUrl.value";

import type { UserId } from "../../user/domain/values/userId.value";

export class Conversation {
  constructor(
    readonly id: ConversationId,
    private readonly messages: Message[],
    readonly userId: UserId,
    private readonly drugName: DrugName,
    private readonly thumbnail: StoredFileUrl,
  ) {}

  getMessages() {
    return this.messages;
  }

  getDrugName() {
    return this.drugName;
  }

  getThumbnailUrl() {
    return this.thumbnail;
  }

  static create(drugName: DrugName, thumbnail: StoredFileUrl, userId: UserId) {
    return new Conversation(
      ConversationId.generate(),
      [Message.first(drugName)],
      userId,
      drugName,
      thumbnail,
    );
  }
}
