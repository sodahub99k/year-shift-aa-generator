import { buildShiftAscii } from "./aa_core.mjs";

const usage = () => {
  console.log(
    [
      "Usage:",
      "  node scripts/aa.mjs <fromYYYY> <toYYYY>",
      "  node scripts/aa.mjs --cases 2026:3026 1999:2000",
      "\nExamples:",
      "  node scripts/aa.mjs 2026 3026",
      "  pnpm aa 2026 3026",
    ].join("\n"),
  );
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    usage();
    console.log("\nDefault cases:\n");
    const defaults = ["2026:3026", "2025:2026", "1999:2000", "0000:9999"];
    for (const entry of defaults) {
      const [from, to] = entry.split(":");
      console.log(`${from} -> ${to}`);
      const out = buildShiftAscii(from, to);
      console.log(out || "(invalid)");
      console.log("");
    }
    return;
  }

  if (args[0] === "--cases") {
    const cases = args.slice(1);
    for (const entry of cases) {
      const [from, to] = entry.split(":");
      console.log(`${from} -> ${to}`);
      const out = buildShiftAscii(from, to);
      console.log(out || "(invalid)");
      console.log("");
    }
    return;
  }

  if (args.length < 2) {
    usage();
    process.exitCode = 1;
    return;
  }

  const [fromYear, toYear] = args;
  const out = buildShiftAscii(fromYear, toYear);
  if (!out) {
    console.error("Invalid input. Both years must be 4 digits (0-9).\n");
    usage();
    process.exitCode = 1;
    return;
  }
  console.log(out);
};

main();
