import { Primitive } from "../../../../framework/domain/primitive.value";

export class Password extends Primitive(String, { label: "Password" }) {}

export class HashedPassword extends Primitive(String, {
  label: "HashedPassword",
}) {}
