import type { Kysely } from "kysely";

import type { DB } from "./kysely.definition";

import type { NullToUndef } from "../../types";

export type KyselyDatabaseDefinition = NullToUndef<DB>;

export type KyselyInstance = Kysely<KyselyDatabaseDefinition>;
