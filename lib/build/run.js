import fs from "node:fs/promises";

import { PATHS } from "./config.js";
import { DistBuilder } from "./entities/DistBuilder.js";

(async () => {
  const dirNames = await fs.readdir(PATHS.SRC);
  const builder = new DistBuilder(dirNames);
  await builder.build();
})();
