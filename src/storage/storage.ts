import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import type { Database } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..","..","src", "db", "logs.json");

export const read = (): Database => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};
export const write = (logs: Database) => {
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
};
