import { Value } from "../../../framework/domain/value";

export interface IMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export class Message extends Value<IMessage> {}
