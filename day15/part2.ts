import getInput from "../utils/getInput";

const [mapInput, moveInput] = getInput(15).split("\n\n");

let map = mapInput
  .replace(/#/g, "##")
  .replace(/\./g, "..")
  .replace(/O/g, "[]")
  .replace(/@/g, "@.")
  .split("\n")
  .map((val) => val.split(""));
const width = map[0].length;
const height = map.length;

const moves = moveInput.replace(/\n/g, "");

let robotPos = { x: 0, y: 0 };
map.forEach((row, y) =>
  row.forEach((tile, x) => {
    if (tile === "@") {
      robotPos = { x, y };
      return;
    }
  })
);

// Recursivley shifts boxes until and empty space is reached.
// Returns false if a move is blocked by a barrier.
function shift(
  origin: { x: number; y: number },
  direction: { x: number; y: number }
): boolean {
  const tile = map[origin.y][origin.x];
  if (tile === "#") return false;
  if (tile === ".") return true;

  const next = { x: origin.x + direction.x, y: origin.y + direction.y };

  // Horizontal shift
  if (direction.y === 0) {
    if (!shift(next, direction)) return false;

    map[next.y][next.x] = tile;
    map[origin.y][origin.x] = ".";
    return true;
  }

  // Vertical shift
  if (tile === "[" || tile === "]") {
    const partnerPos = { x: origin.x + (tile === "[" ? 1 : -1), y: origin.y };
    const partnerNext = { x: partnerPos.x, y: partnerPos.y + direction.y };

    if (!shift(next, direction) || !shift(partnerNext, direction)) return false;

    map[next.y][next.x] = tile;
    map[partnerNext.y][partnerNext.x] = tile === "[" ? "]" : "[";
    map[origin.y][origin.x] = ".";
    map[partnerPos.y][partnerPos.x] = ".";
    return true;
  }

  // Robot move
  if (tile === "@") {
    if (!shift(next, direction)) return false;
    map[next.y][next.x] = "@";
    map[origin.y][origin.x] = ".";
    return true;
  }

  return false;
}

for (let move of moves) {
  const ogMap = map.map((val) => [...val]);

  const moveOffsets = {
    "^": { x: 0, y: -1 },
    ">": { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    "<": { x: -1, y: 0 },
  };
  const offset = moveOffsets[move];

  const result = shift(robotPos, offset);
  if (result === false) {
    map = ogMap;
    continue;
  }

  robotPos.x += offset.x;
  robotPos.y += offset.y;
}

let total = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "[") total += 100 * y + x;
  }
}

console.log(total);
