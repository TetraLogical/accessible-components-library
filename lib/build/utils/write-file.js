import fs from "node:fs/promises";
import path from "node:path";

// Writes a file, creating any folders in its path that don't exist yet
export async function writeFile (filePath, contents) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents);
}
