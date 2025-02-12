import { Primitive } from "../../../../framework/domain/primitive.value";

export class Email extends Primitive(String, {
  label: "Email",
}) {}
