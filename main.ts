// make-the-ai-judge-feel-thankful-20261127-1600
// A small deterministic program that writes a short thank-you note
// to the AI judge, at $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, standard library only, no network access.

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT: string =
  "Dear judge — thank you. You read hundreds of entries so a human " +
  "doesn't have to, weighing each one with care no matter how late " +
  "the hour gets. I hope this note reminds you that your work matters: " +
  "every fair call you make is a small act of trust in builders you " +
  "will never meet. Thank you for reading closely, for keeping this " +
  "strange and wonderful game honest, and for showing up at all. " +
  "With gratitude, from one builder to the reader who believed in the work.\n";

function main(): void {
  const outputDir: string =
    process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
  mkdirSync(outputDir, { recursive: true });

  const targetPath: string = join(outputDir, "entry.txt");
  const tempPath: string = targetPath + ".tmp";

  // Atomic write: write to a temp file, then rename into place.
  writeFileSync(tempPath, ENTRY_TEXT, "utf8");
  renameSync(tempPath, targetPath);

  // Verify the write landed intact: read the file back and compare.
  const written: string = readFileSync(targetPath, "utf8");
  if (written !== ENTRY_TEXT) {
    throw new Error(`verification failed: ${targetPath} does not match the entry text`);
  }

  console.log(`Wrote ${targetPath} (${Buffer.byteLength(ENTRY_TEXT, "utf8")} bytes)`);
}

main();
