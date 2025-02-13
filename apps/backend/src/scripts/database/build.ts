import type { Compilable } from "kysely";

import { db } from "../../boot/db";

async function exec(intent: Compilable & { execute(): Promise<any> }) {
  const before = Date.now();
  const compiledQuery = intent.compile();

  await intent.execute();
  const after = Date.now();
  console.log(
    `\n[~] Intent executed in ${after - before}ms: \n${compiledQuery.sql}`,
  );
}

async function main() {
  await exec(db.schema.dropTable("user").ifExists());
  await exec(db.schema.dropTable("userSession").ifExists());
  await exec(db.schema.dropTable("conversation").ifExists());

  await exec(
    db.schema
      .createTable("user")
      .addColumn("id", "varchar(60)", (col) => col.primaryKey())
      .addColumn("email", "varchar(255)", (col) => col.unique().notNull())
      .addColumn("password", "varchar(72)", (col) => col.unique().notNull())
      .ifNotExists(),
  );

  await exec(
    db.schema
      .createTable("userSession")
      .addColumn("id", "varchar(60)", (col) => col.primaryKey())
      .addColumn("userId", "varchar(60)", (col) =>
        col.references("user.id").notNull(),
      )
      .ifNotExists(),
  );

  await exec(
    db.schema
      .createTable("conversation")
      .addColumn("id", "varchar(60)", (col) => col.primaryKey())
      .addColumn("userId", "varchar(60)", (col) =>
        col.references("user.id").notNull(),
      )
      .addColumn("messages", "json", (col) => col.notNull())
      .addColumn("drugName", "varchar(255)", (col) => col.notNull())
      .addColumn("thumbnail", "varchar(255)", (col) => col.notNull())
      .ifNotExists(),
  );
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .then(() => process.exit(0));
