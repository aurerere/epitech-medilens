import type { ITransaction } from "./transaction";

import type { AnyId } from "../domain/anyId.value";

export interface Identifiable {
  id: AnyId;
}

export interface Store<T extends Identifiable> {
  load(id: T["id"], transaction?: ITransaction): Promise<T | undefined>;

  save(model: T, transaction?: ITransaction): Promise<void>;
}
