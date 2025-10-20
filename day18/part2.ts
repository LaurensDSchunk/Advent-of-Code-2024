import getInput from "../utils/getInput";
import { PriorityQueue } from "@datastructures-js/priority-queue";

const input = getInput(18)
  .split("\n")
  .map((val) => [...val.matchAll(/(\d+)/g)].map((v) => Number.parseInt(v[0])));
const width = 71;
const height = 71;
const map = Array.from({ length: height }, () => Array(width).fill("."));

function isMazePossible() {
  const visitMap = Array.from({ length: height }, () =>
    Array(width).fill(false)
  );
  const moveStack = new PriorityQueue<{ x: number; y: number; dist: number }>(
    (a, b) => a.dist - b.dist
  );
  moveStack.push({ x: 0, y: 0, dist: 0 });

  while (moveStack.size() !== 0) {
    const { x, y, dist } = moveStack.pop();
    if (
      x < 0 ||
      x >= width ||
      y < 0 ||
      y >= height ||
      map[y][x] === "#" ||
      visitMap[y][x]
    )
      continue;
    visitMap[y][x] = true;

    if (x === width - 1 && y === height - 1) {
      return true;
    }

    [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ].forEach((offset) => {
      moveStack.push({ x: x + offset.x, y: y + offset.y, dist: dist + 1 });
    });
  }
  return false;
}

for (let i = 0; i < input.length; i++) {
  const [x, y] = input[i];
  map[y][x] = "#";
  if (isMazePossible()) continue;

  console.log(`${x},${y}`)
  break;
}