import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
// Validate the gate before writing: 1-280 Unicode code points, not only whitespace.
const body = text.replace(/\r?\n$/, "");
if ([...body].length < 1 || [...body].length > 280) {
  throw new Error(`entry.txt must be 1-280 code points, got ${[...body].length}`);
}
if (body.trim().length === 0) {
  throw new Error("entry.txt must not be only whitespace");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
