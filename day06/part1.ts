import getInput from "../utils/getInput";

const input = getInput(6).split("\n");

const map = input.map((v) => v.split(""));
const height = map.length;
const width = map[0].length;
const visitMap = Array.from({ length: height }, () => Array(width).fill(false));


let guardPos: {
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right";
} = { x: 0, y: 0, direction: "up" };
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "^") {
      guardPos = { x, y, direction: "up" };
      visitMap[y][x] = true;
    }
  }
}

const offsets = {
  up: {x: 0, y: -1},
  down: {x: 0, y: 1},
  left: {x: -1, y: 0},
  right: {x: 1, y: 0}
}
const rotations = {
  up: "right",
  right: "down",
  down: "left",
  left: "up"
}

while (guardPos.x >= 0 && guardPos.x < width && guardPos.y >= 0 && guardPos.y < height) {
  const offset = offsets[guardPos.direction];
  const targetX = guardPos.x + offset.x;
  const targetY = guardPos.y + offset.y;

  if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
    if (map[targetY][targetX] === "#") {
      guardPos.direction = rotations[guardPos.direction] as "left" | "right" | "up" | "down";
      continue;
    }
  }

  visitMap[guardPos.y][guardPos.x] = true;
  guardPos.x = targetX;
  guardPos.y = targetY;
}

let total = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (visitMap[y][x]) total++; 
  }
}

console.log(total);

export {visitMap as visitedPlaces};