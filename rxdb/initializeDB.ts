import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration-schema";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

import { TodoSchema } from "./noteSchema";
export const STORAGE = getRxStorageMemory();
const dbName = "database";
export const noteCollectionName = "notes";

const initializeDB = async () => {
  let db: any;

  try {
    db = await createRxDatabase({
      name: dbName,
      storage: STORAGE,
      multiInstance: true,
      ignoreDuplicate: true,
    });
  } catch (err) {
    console.log("ERROR CREATING DATABASE", err);
  }

  try {
    await db.addCollections({
      [noteCollectionName]: {
        schema: TodoSchema,
      },
    });
  } catch (err) {
    console.log("ERROR CREATING COLLECTION", err);
  }

  return db;
};

export default initializeDB;
