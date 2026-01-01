import { DIGIT_ART, DIGIT_HEIGHT, DIGIT_WIDTH } from "./digitArt.mjs";

const BLANK_CELL = " ".repeat(DIGIT_WIDTH);

const isYear4 = (value) => typeof value === "string" && /^[0-9]{4}$/.test(value);
const rtrim = (value) => value.replace(/[ \t]+$/u, "");

const getGlyph = (digit) => {
  const glyph = DIGIT_ART[digit];
  if (!glyph || !Array.isArray(glyph) || glyph.length !== DIGIT_HEIGHT) return null;
  if (glyph.some((row) => typeof row !== "string")) return null;
  return glyph;
};

const makeStaticCell = (digit) => {
  const glyph = getGlyph(digit);
  if (!glyph) return null;
  return { rows8: [BLANK_CELL, ...glyph, BLANK_CELL] };
};

const makeShiftCell = (fromDigit, toDigit) => {
  const fromGlyph = getGlyph(fromDigit);
  const toGlyph = getGlyph(toDigit);
  if (!fromGlyph || !toGlyph) return null;

  const stack = [...toGlyph, ...fromGlyph];
  const shift = 3;

  const topOverflow = stack[shift - 1] ?? BLANK_CELL;
  const window6 = stack.slice(shift, shift + DIGIT_HEIGHT);
  while (window6.length < DIGIT_HEIGHT) window6.push(BLANK_CELL);
  const bottomOverflow = stack[shift + DIGIT_HEIGHT] ?? BLANK_CELL;

  return { rows8: [topOverflow, ...window6, bottomOverflow] };
};

const renderFrame = (cells) => {
  const rows = Array.from({ length: 8 }, () => "");
  for (let row = 0; row < 8; row += 1) {
    rows[row] = cells.map((cell) => cell.rows8[row] ?? BLANK_CELL).join("");
  }

  const top = rtrim(rows[0]);
  const bottom = rtrim(rows[7]);
  const middle = rows.slice(1, 7).map((line) => rtrim(line));

  const output = [];
  if (top.length > 0) output.push(top);
  output.push(...middle);
  if (bottom.length > 0) output.push(bottom);
  return output.join("\n");
};

export const buildShiftAscii = (fromYear, toYear) => {
  if (!isYear4(fromYear) || !isYear4(toYear)) return "";

  const fromDigits = fromYear.split("");
  const toDigits = toYear.split("");

  const cells = [];
  for (let i = 0; i < 4; i += 1) {
    const fromDigit = fromDigits[i];
    const toDigit = toDigits[i];
    const cell = fromDigit === toDigit ? makeStaticCell(toDigit) : makeShiftCell(fromDigit, toDigit);
    if (!cell) return "";
    cells.push(cell);
  }

  return renderFrame(cells);
};
