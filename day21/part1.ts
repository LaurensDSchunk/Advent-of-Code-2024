import { PriorityQueue } from "@datastructures-js/priority-queue";
import getInput from "../utils/getInput";

type Vec2 = { x: number; y: number };
type Keypad = (string | null)[][];


const codes = getInput(21)
  .split("\n")

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

function getPatternsForKeypad(pattern: string, keypad: Keypad): string[] {
  let allSolutions = [];
  let startPos = findIn2dArray("A", keypad);

  outer: for (let char of pattern) {
    const queue: { x: number; y: number; path: string }[] = [];
    queue.push({ ...startPos, path: "" });
    let shortest = Infinity;
    let paths: string[] = [];

    const visited = new Set<string>();

    while (queue.length !== 0) {
      const tile = queue.shift();
      const key = `x${tile.x}y${tile.y}len${tile.path.length}`;
      if (!vec2InArray(tile, keypad) || keypad[tile.y][tile.x] === null)
        continue;
      //if (visited.has(key)) continue;
      visited.add(key);

      if (keypad[tile.y][tile.x] === char) {
        tile.path += "A";
        if (tile.path.length < shortest) {
          shortest = tile.path.length;
          paths = [tile.path]; // reset with new shortest
        } else if (tile.path.length === shortest) {
          paths.push(tile.path); // add equally short path
        }
        continue;
      }

      if (tile.path.length > shortest) continue;

      [
        { x: 0, y: -1, symbol: "^" },
        { x: 0, y: 1, symbol: "v" },
        { x: -1, y: 0, symbol: "<" },
        { x: 1, y: 0, symbol: ">" },
      ].forEach((offset) => {
        queue.push({
          x: tile.x + offset.x,
          y: tile.y + offset.y,
          path: tile.path + offset.symbol,
        });
      });
    }

    // If this is the first key, initialize
    if (allSolutions.length === 0) {
      allSolutions = paths;
    } else {
      // Cross product all existing solutions with all new paths
      const newSolutions: string[] = [];
      for (const prefix of allSolutions) {
        for (const addition of paths) {
          newSolutions.push(prefix + addition);
        }
      }
      allSolutions = newSolutions;
    }

    startPos = findIn2dArray(char, keypad);
  }

  return allSolutions;
}

let total = 0;
for (let code of codes) {
  let allPatterns = getPatternsForKeypad(code, numericKeypad);

  for (let i = 0; i < 2; i++) {
    const newAll = []
    let shortest = Infinity;
    
    for (let path of allPatterns) {
      const patterns = getPatternsForKeypad(path, directionalKeypad);

      for (let pattern of patterns) {
        if (pattern.length < shortest) {
          allPatterns = [pattern];
          shortest = pattern.length;
        } else if (pattern.length === shortest) {
          allPatterns.push(pattern);
        }
      }
    }
  }
  const numericPart = Number.parseInt(code.substring(0, code.length - 1))
  total += numericPart * (allPatterns[0].length);
}

console.log(total);

