import type { MessageContent } from "./messageContent.value";

import { Value } from "../../../../framework/domain/value";
import { ApplicativeError } from "../../../../framework/applicative/applicativeError";

export interface IMessage {
  role: "user" | "system" | "assistant";
  content: string;
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

  fromUser(content: MessageContent) {
    return new Message({
      role: "user",
      content: content.serialize(),
    });
  }
}
