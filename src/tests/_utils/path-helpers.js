import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { cwd } from "node:process";

// Returns __filename equivalent for ES modules
export const getFilename = (importMetaUrl) => {
  return fileURLToPath(importMetaUrl);
};

// Returns __dirname equivalent for ES modules
export const getDirname = (importMetaUrl) => {
  const __filename = fileURLToPath(importMetaUrl);
  return dirname(__filename);
};

// Returns the root directory of the project
export const getRootDir = () => {
  return cwd();
};
