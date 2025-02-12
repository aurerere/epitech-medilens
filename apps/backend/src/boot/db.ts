import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";

import type {
  KyselyDatabaseDefinition,
  KyselyInstance,
} from "../framework/infrastructure/store/kysely.types";
import { Environment } from "../framework/infrastructure/environment";

export const db: KyselyInstance = new Kysely<KyselyDatabaseDefinition>({
  dialect: new MysqlDialect({
    pool: createPool({
      host: Environment.get("MYSQL_HOST"),
      user: Environment.get("MYSQL_USER"),
      password: Environment.get("MYSQL_PASSWORD"),
      database: Environment.get("MYSQL_DATABASE"),

      typeCast: (field, next) => {
        switch (field.type) {
          case "TINY": {
            const fieldString = field.string();
            return fieldString ? fieldString === "1" : null;
          }
          case "DATETIME": {
            const fieldString = field.string();
            return fieldString ? new Date(fieldString) : null;
          }
          case "JSON": {
            const fieldString = field.string();
            return fieldString ? JSON.stringify(fieldString) : null;
          }
          default:
            return next();
        }
      },
    }),
  }),
});
