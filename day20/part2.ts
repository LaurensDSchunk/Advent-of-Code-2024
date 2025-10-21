import { PriorityQueue } from "@datastructures-js/priority-queue";
import getInput from "../utils/getInput";

const map = getInput(20)
  .split("\n")
  .map((val) => val.split(""));
const width = map[0].length;
const height = map.length;

let startPoint = { x: 0, y: 0 };
let endPoint = { x: 0, y: 0 };
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "S") startPoint = { x, y };
    if (map[y][x] === "E") endPoint = { x, y };
  }
}

function findShortestPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  distMap: number[][]
): number {
  const visitedMap = Array.from({ length: height }, () =>
    Array(width).fill(false)
  );
  const queue = new PriorityQueue<{ x: number; y: number; dist: number }>(
    (a, b) => a.dist - b.dist
  );
  queue.push({ ...from, dist: 0 });

  while (queue.size() !== 0) {
    const { x, y, dist } = queue.pop();
    if (visitedMap[y][x] === true) continue;
    visitedMap[y][x] = true;
    if (map[y][x] === "#") continue;
    distMap[y][x] = Math.min(distMap[y][x], dist);
    if (x === to.x && y === to.y) return dist;

    [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ].forEach(([xOff, yOff]) => {
      queue.push({ x: x + xOff, y: y + yOff, dist: dist + 1 });
    });
  }
}

const distMap = Array.from({ length: height }, () =>
  Array(width).fill(Infinity)
);
const fastestTime = findShortestPath(endPoint, startPoint, distMap);
const offsets = [];
for (let x = -20; x <= 20; x++) {
  const xAmnt = Math.abs(x);
  for (let y = -(20 - xAmnt); y <= 20 - xAmnt; y++) {
    offsets.push([x,y]);
  }
}

let total = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    offsets.forEach(([xOff, yOff]) => {
      const cheatX = x + xOff;
      const cheatY = y + yOff;

      if (cheatX < 0 || cheatX >= width || cheatY < 0 || cheatY >= height)
        return;
      if (map[cheatY][cheatX] === "#") return;

      const beforeDist = distMap[y][x];
      const afterDist = distMap[cheatY][cheatX];

      const cheatDist = Math.abs(x - cheatX) + Math.abs(y - cheatY);
      const diff = afterDist - beforeDist - cheatDist;
      if (diff < 100) return;
      total++;
    });
  }
}

console.log(total);
