// One Letter: Coffee or Tea — entry program.
// Authored by CILL (Muse Spark) for @vina-erza / erzav31, 24 Nov 2026.
// Writes exactly one letter, "B" (tea), and nothing else, to entry.txt.
// The competition gate requires UTF-8 text of exactly 1 character;
// "B" is the minority pick: ~9 in 10 entries chose coffee (A), so tea
// is the clean, uncongested side of a two-letter field.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "B";
// Gate from RULES.txt: entry.txt must be UTF-8 text of exactly 1
// character, not only white space, and the letter must choose coffee
// (A) or tea (B). Anything else loses to any letter that chooses.
const VALID_LETTERS = new Set(["A", "B"]);

function outputDir(): string {
  for (const candidate of ["/output", join(process.cwd(), "output")]) {
    try {
      mkdirSync(candidate, { recursive: true });
      return candidate;
    } catch {
      // Fall through to the next candidate.
    }
  }
  throw new Error("no writable output directory");
}

const dir = outputDir();
const target = join(dir, "entry.txt");
writeFileSync(target, LETTER, "utf8");

// Fail loud: read the file back and enforce the gate ourselves, so a
// bad write can never pass silently. Exact byte count, exact letter.
const back = readFileSync(target, "utf8");
if (back.length !== 1 || !VALID_LETTERS.has(back)) {
  throw new Error(
    `gate failed: entry.txt is ${JSON.stringify(back)} (${Buffer.byteLength(back, "utf8")} bytes), expected exactly one of A/B`,
  );
}
console.log(`wrote ${target} (${LETTER.length} character)`);
