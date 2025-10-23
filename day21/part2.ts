import { PriorityQueue } from "@datastructures-js/priority-queue";
import getInput from "../utils/getInput";

type Vec2 = { x: number; y: number };
type Keypad = (string | null)[][];
type Costs = Record<string, Record<string, number>>;

const codes = getInput(21).split("\n");

const numericKeypad: Keypad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [null, "0", "A"],
];

const directionalKeypad: Keypad = [
  [null, "^", "A"],
  ["<", "v", ">"],
];

function findIn2dArray(value: any, array: any[][]): Vec2 {
  const width = array[0].length;
  const height = array.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (array[y][x] === value) return { x, y };
    }
  }

  return { x: -1, y: -1 };
}

function vec2InArray(vec2: Vec2, array: any[][]) {
  const width = array[0].length;
  const height = array.length;

  return vec2.x >= 0 && vec2.x < width && vec2.y >= 0 && vec2.y < height;
}

// If costs is undefined, each action costs 1 (human level)
// This funciton is the cost to go from one button to another, including the button press
function getCosts(keypad: Keypad, costs?: Costs): Costs {
  const result = {};
  const allKeys = keypad.flat().filter((k) => k !== null);

  for (const startChar of allKeys) {
    const newCosts: Record<string, number> = {};
    const startPos = findIn2dArray(startChar, keypad);
    const queue = new PriorityQueue<Vec2 & { cost: number; lastMove: string }>(
      (a, b) => a.cost - b.cost
    );
    const visited = new Set<string>();
    queue.push({ ...startPos, cost: 0, lastMove: "A" });

    while (queue.size() !== 0) {
      const tile = queue.pop();

      if (!vec2InArray(tile, keypad) || keypad[tile.y][tile.x] === null)
        continue;

      newCosts[keypad[tile.y][tile.x]] = Math.min(
        tile.cost + (costs === undefined ? 1 : costs[tile.lastMove]["A"]), // Including A button press
        newCosts[keypad[tile.y][tile.x]] ?? Infinity
      );
      const key = `x${tile.x}y${tile.y}lastMove${tile.lastMove}`;
      if (visited.has(key)) continue;
      visited.add(key);

      for (const { dy, dx, sym } of [
        { dy: -1, dx: 0, sym: "^" },
        { dy: 1, dx: 0, sym: "v" },
        { dy: 0, dx: -1, sym: "<" },
        { dy: 0, dx: 1, sym: ">" },
      ]) {
        const costAddition =
          costs === undefined ? 1 : costs[tile.lastMove][sym];
        queue.push({
          x: tile.x + dx,
          y: tile.y + dy,
          lastMove: sym,
          cost: tile.cost + costAddition,
        });
      }
    }

    result[startChar] = newCosts;
  }

  return result;
}


let costs = undefined;
for (let i = 0; i < 25; i++) {
  costs = getCosts(directionalKeypad, costs);
}
costs = getCosts(numericKeypad, costs);

let total = 0;
for (const code of codes) {
  let cost = 0;
  let last = "A";
  for (let i = 0; i < code.length; i++) {
    cost += costs[last][code[i]];
    last = code[i];
  }

  const numericPart = Number.parseInt(code.substring(0, code.length - 1))
  total += numericPart * (cost);
}

console.log(total); // Goal: 126384
