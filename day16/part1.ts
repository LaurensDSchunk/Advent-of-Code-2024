import getInput from "../utils/getInput";
import { PriorityQueue } from "@datastructures-js/priority-queue";

type Direction = "up" | "down" | "left" | "right";
const directions: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

type Position = { x: number; y: number; facing: Direction };
const offsets: Position[] = [
  { x: 0, y: 1, facing: "down" },
  { x: 0, y: -1, facing: "up" },
  { x: 1, y: 0, facing: "right" },
  { x: -1, y: 0, facing: "left" },
];

const map = getInput(16)
  .split("\n")
  .map((val) => val.split(""));
const width = map[0].length;
const height = map.length;
const startPoint = { x: 1, y: height - 2 };

const visited = new Set<string>();
const queue = new PriorityQueue<Position & { cost: number }>(
  (a, b) => a.cost - b.cost
);

queue.enqueue({...startPoint, facing: "right", cost: 0});

while (queue.size() !== 0) {
  const position = queue.dequeue();
  const key = `${position.x},${position.y},${position.facing}`;

  if (visited.has(key)) continue;
  visited.add(key);

  if (map[position.y][position.x] === "#") continue;
  if (map[position.y][position.x] === "E") {
    console.log(position.cost); // End point
    break;
  }

  for (let offset of offsets) {
    const x = position.x + offset.x;
    const y = position.y + offset.y;
    let cost = position.cost + 1;
    if (offset.facing !== position.facing) cost += 1000;

    queue.enqueue({ x, y, facing: offset.facing, cost });
  }
}
