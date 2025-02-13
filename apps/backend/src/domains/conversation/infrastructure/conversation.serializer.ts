import { Conversation } from "../domain/conversation";
import type { Serialized } from "../../../framework/types";
import { ConversationId } from "../domain/values/conversationId.value";
import type { IMessage } from "../domain/values/message.value";
import { Message } from "../domain/values/message.value";
import { UserId } from "../../user/domain/values/userId.value";
import { DrugName } from "../domain/values/drugName.value";
import { StoredFileUrl } from "../domain/values/storedFileUrl.value";

export class ConversationSerializer {
  serialize(conversation: Conversation) {
    return {
      id: conversation.id.serialize(),
      messages: JSON.stringify(
        conversation.getMessages().map((message) => message.serialize()),
      ),
      userId: conversation.userId.serialize(),
      drugName: conversation.getDrugName().serialize(),
      thumbnail: conversation.getThumbnailUrl().serialize(),
    };
  }

  deserialize(serialized: Serialized<this>) {
    return new Conversation(
      ConversationId.deserialize(serialized.id),
      (JSON.parse(serialized.messages) as IMessage[]).map((message) =>
        Message.deserialize(message),
      ),
      UserId.deserialize(serialized.userId),
      DrugName.deserialize(serialized.drugName),
      StoredFileUrl.deserialize(serialized.thumbnail),
    );
  }
}
