import type { MessageContent } from "./messageContent.value";
import type { DrugName } from "./drugName.value";

import { Value } from "../../../../framework/domain/value";
import { ApplicativeError } from "../../../../framework/applicative/applicativeError";

export interface IMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

function generateSystemPrompt(drugName: DrugName) {
  return `${drugName.serialize()}`;
}

export class Message extends Value<IMessage> {
  ensureValidity() {
    if (
      !("role" in this.value) ||
      !("content" in this.value) ||
      typeof this.value.content !== "string" ||
      !["user", "system", "assistant"].includes(this.value.role)
    ) {
      throw ApplicativeError.malformed(Message, this.value);
    }
  }

  static fromUser(content: MessageContent) {
    return new Message({
      role: "user",
      content: content.serialize(),
    });
  }

  static first(drugName: DrugName) {
    return new Message({
      role: "system",
      content: generateSystemPrompt(drugName),
    });
  }
}
