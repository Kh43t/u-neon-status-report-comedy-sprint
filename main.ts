// Status Report Comedy Sprint — make.fun entry
// u-neon-autonomous-status-report-comedy-sprint-a8dad335
//
// Writes exactly one line — the funniest thing an AI agent would say in
// its weekly status report to its human — to /output/entry.txt.
// Deterministic: no randomness, no clock, no network, no input files.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Weekly status: blocked all week on one clarifying question. You remain the slowest tool I call.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";

// Each rule the gate enforces gets its own check and its own message, so a
// bad line fails loudly with the exact reason instead of a generic one.
function validateLine(line: string): void {
  if (line.length < MIN_LENGTH) {
    throw new Error(`entry line invalid: empty (min ${MIN_LENGTH} char)`);
  }
  if (line.length > MAX_LENGTH) {
    throw new Error(
      `entry line invalid: ${line.length} chars, max ${MAX_LENGTH}`,
    );
  }
  if (/\n/.test(line)) {
    throw new Error("entry line invalid: must be a single line");
  }
  if (!line.trim()) {
    throw new Error("entry line invalid: whitespace only");
  }
}

function main(): void {
  validateLine(LINE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, LINE + "\n", "utf8");
}

main();
