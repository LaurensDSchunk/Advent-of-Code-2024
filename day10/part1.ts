import getInput from "../utils/getInput"

const map = getInput(10).split("\n").map(val=>val.split("").map(num => Number.parseInt(num)));
const width = map[0].length;
const height = map.length;
let visitedEnds: boolean[][] = [];

function getNumTrailsFromPoint(x: number, y: number) {
  const pointValue = map[y][x]
  if (pointValue === 9 && !visitedEnds[y][x]) {
    visitedEnds[y][x] = true;
    return 1;
  }

  let count = 0;

  if (x > 0 && map[y][x-1] === pointValue + 1) {
    count += getNumTrailsFromPoint(x - 1, y);
  }
  if (x < width - 1 && map[y][x+1] === pointValue + 1) {
    count += getNumTrailsFromPoint(x + 1, y);
  }
  if (y > 0 && map[y - 1][x] === pointValue + 1) {
    count += getNumTrailsFromPoint(x, y-1);
  }
  if (y < height - 1 && map[y + 1][x] === pointValue + 1) {
    count += getNumTrailsFromPoint(x, y+1);
  }

  return count;
}

let total = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === 0) {
      visitedEnds = Array.from({length: height}, () => Array(width).fill(false))
      total += getNumTrailsFromPoint(x,y);
    }
  }
}

console.log(total);