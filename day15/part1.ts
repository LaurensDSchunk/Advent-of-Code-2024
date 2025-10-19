import getInput from "../utils/getInput"

const [mapInput, moveInput] = getInput(15).split("\n\n");

const map = mapInput.split("\n").map(val=>val.split(""));
const width = map[0].length;
const height = map.length;

const moves = moveInput.replace(/\n/g, "")

let robotPos = {x: 0, y: 0}
map.forEach((row, y) => row.forEach((tile, x) => {
  if (tile === '@') {
    robotPos = {x,y};
    return;
  }
}))

function moveRobot(move: string) {
  const moveOffsets = {
    "^": {x: 0, y: -1},
    ">": {x: 1, y: 0},
    "v": {x: 0, y: 1},
    "<": {x: -1, y: 0}
  }

  const offset = moveOffsets[move];

  const newPos = {x: robotPos.x + offset.x, y: robotPos.y + offset.y}
  let checkPos = {...newPos};
  while (map[checkPos.y][checkPos.x] === "O") {
    checkPos.x += offset.x;
    checkPos.y += offset.y;
  }

  if (map[checkPos.y][checkPos.x] === ".") {
    map[checkPos.y][checkPos.x] = "O";
    map[newPos.y][newPos.x] = "@";
    map[robotPos.y][robotPos.x] = ".";
    robotPos = newPos
    return;
  }
}

for (let move of moves) {
  moveRobot(move);
}

let total = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "O") total += 100 * y + x;
  }
}

console.log(total);