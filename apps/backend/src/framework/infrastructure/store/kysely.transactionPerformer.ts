import type { Transaction } from "kysely";

import type { KyselyDatabaseDefinition, KyselyInstance } from "./kysely.types";

import type {
  ITransaction,
  TransactionPerformer,
} from "../../applicative/transaction";

export class KyselyTransaction implements ITransaction {
  private commitCallback?: () => void | Promise<void>;

  constructor(readonly base: Transaction<KyselyDatabaseDefinition>) {}

  onCommit(cb: () => void | Promise<void>) {
    this.commitCallback = cb;
  }

  get __commitCallback__() {
    return this.commitCallback;
  }
}

export class KyselyTransactionPerformer implements TransactionPerformer {
  constructor(private readonly db: KyselyInstance) {}

  async perform<R>(fn: (trx: KyselyTransaction) => Promise<R>): Promise<R> {
    return this.db.transaction().execute(async (kyselyBaseTransaction) => {
      const transaction = new KyselyTransaction(kyselyBaseTransaction);
      const value = await fn(transaction);
      await transaction.__commitCallback__?.();
      return value;
    });
  }
}
