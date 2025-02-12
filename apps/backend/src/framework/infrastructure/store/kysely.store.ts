import type { SelectQueryBuilder } from "kysely";

import type { KyselyDatabaseDefinition, KyselyInstance } from "./kysely.types";
import type { KyselyTransaction } from "./kysely.transactionPerformer";

import type { Identifiable, Store } from "../../applicative/store";
import type { Serializer } from "../serializer";

type ExtractTableAlias<DB, TE> = TE extends `${string} as ${infer TA}`
  ? TA extends keyof DB
    ? TA
    : never
  : TE extends keyof DB
    ? TE
    : never;

type QueryExpression<T extends keyof KyselyDatabaseDefinition> =
  SelectQueryBuilder<
    KyselyDatabaseDefinition,
    ExtractTableAlias<KyselyDatabaseDefinition, T>,
    {} // eslint-disable-line
  >;

export class KyselyStore<
  M extends Identifiable,
  T extends keyof KyselyDatabaseDefinition,
> implements Store<M>
{
  constructor(
    private readonly db: KyselyInstance,
    private readonly table: T,
    private serializer: Serializer<M, KyselyDatabaseDefinition[T]>,
  ) {}

  private insert(transaction?: KyselyTransaction) {
    if (transaction) {
      return transaction.base.insertInto(this.table);
    }
    return this.db.insertInto(this.table);
  }

  private delete(transaction?: KyselyTransaction) {
    if (transaction) {
      return transaction.base.deleteFrom(this.table);
    }
    return this.db.deleteFrom(this.table);
  }

  protected query(transaction?: KyselyTransaction) {
    if (transaction) {
      return transaction.base.selectFrom(this.table);
    }
    return this.db.selectFrom(this.table);
  }

  protected async findOne(query: QueryExpression<T>) {
    const result = await query.selectAll().executeTakeFirst();

    if (!result) {
      return undefined;
    }

    return this.serializer.deserialize(result as any);
  }

  protected async exists(query: QueryExpression<T>) {
    return !!(await query.selectAll().executeTakeFirst());
  }

  protected async findMany(query: QueryExpression<T>, limit: number = 50) {
    const result = await query.selectAll().limit(limit).execute();

    return result.map((item) => this.serializer.deserialize(item as any));
  }

  load(id: M["id"], transaction?: KyselyTransaction) {
    return this.findOne(
      this.query(transaction).where("id", "=", id.serialize() as any),
    );
  }

  async save(model: M, transaction?: KyselyTransaction) {
    const toSave = this.serializer.serialize(model);

    await this.insert(transaction)
      .values(toSave as any)
      .onDuplicateKeyUpdate(() => {
        const { id: _, ...data } = toSave; // eslint-disable-line
        return data as any;
      })
      .execute();
  }

  async remove(id: M["id"], transaction?: KyselyTransaction) {
    await this.delete(transaction)
      .where("id", "=", id.serialize() as any)
      .execute();
  }

  async saveBulk(models: M[], transaction?: KyselyTransaction) {
    await Promise.all([
      models.map(async (model) => {
        await this.save(model, transaction);
      }),
    ]);
  }
}
