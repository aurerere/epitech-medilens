import { Primitive } from "../../../../../../framework/domain/primitive.value";

export class SessionToken extends Primitive(String, {
  label: "SessionToken",
}) {}
