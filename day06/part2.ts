import getInput from "../utils/getInput";
import { visitedPlaces } from "./part1";

type Rotation = "up" | "down" | "left" | "right";
type PositionVector = { x: number; y: number; direction: Rotation };
const offsets = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const rotations = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

const input = getInput(6).split("\n");

const map = input.map((v) => v.split(""));
const height = map.length;
const width = map[0].length;

let startPos: PositionVector = { x: 0, y: 0, direction: "up" };
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "^") {
      startPos = { x, y, direction: "up" };
    }
  }
}

function isLoop(): boolean {
  const visitMap: Set<Rotation>[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => new Set<Rotation>())
  );

  let guardPos = { ...startPos };

  while (
    guardPos.x >= 0 &&
    guardPos.x < width &&
    guardPos.y >= 0 &&
    guardPos.y < height
  ) {
    const offset = offsets[guardPos.direction];
    const targetX = guardPos.x + offset.x;
    const targetY = guardPos.y + offset.y;

    if (visitMap[guardPos.y][guardPos.x].has(guardPos.direction)) {
      return true;
    }
    visitMap[guardPos.y][guardPos.x].add(guardPos.direction);

    if (targetY >= 0 && targetY < height && targetX >= 0 && targetX < width) {
      if (map[targetY][targetX] === "#") {
        guardPos.direction = rotations[guardPos.direction] as Rotation;
        continue;
      }
    }

    guardPos.x = targetX;
    guardPos.y = targetY;
  }

  return false;
}

let total = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (visitedPlaces[y][x] === false || map[y][x] === "#" || map[y][x] === "^") continue;
    map[y][x] = "#";
    if (isLoop()) total++;
    map[y][x] = ".";
  }
}

console.log(total);
