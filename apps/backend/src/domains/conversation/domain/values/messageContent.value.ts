import { Primitive } from "../../../../framework/domain/primitive.value";

export class MessageContent extends Primitive(String, {
  label: "MessageContent",
}) {}
