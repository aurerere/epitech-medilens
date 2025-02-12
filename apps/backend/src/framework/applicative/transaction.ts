export interface ITransaction {
  onCommit(cb: () => Promise<void> | void): void;
}

export interface TransactionPerformer {
  perform<T>(fn: (transaction: ITransaction) => Promise<T>): Promise<T>;
}
