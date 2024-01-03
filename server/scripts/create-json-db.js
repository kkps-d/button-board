import { JSONFilePreset } from "lowdb/node";

const PATH = "storage/db.json";
const SCHEMA = {
  devices: [],
};

const db = await JSONFilePreset(PATH, SCHEMA);
await db.write();

console.log(`Created "${PATH}" with schema:`);
console.log(SCHEMA);
