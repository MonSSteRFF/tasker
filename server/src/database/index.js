import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));

const keysDatabase = new Low(new JSONFile(join(__dirname, './keys.json')));
const usersDatabase = new Low(new JSONFile(join(__dirname, './users.json')));

const readWriteDb = async (db, callback) => {
  await db.read();

  const data = db.data;
  await callback(data);

  await db.write();
  return data;
};

export { keysDatabase, usersDatabase, readWriteDb };
