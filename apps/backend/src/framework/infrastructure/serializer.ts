import type { Identifiable } from "../applicative/store";

export interface Serializer<Instance extends Identifiable, Serialized> {
  serialize(model: Instance): Serialized;

  deserialize(serialized: Serialized): Instance;
}
