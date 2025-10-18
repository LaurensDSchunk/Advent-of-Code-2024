import getInput from "../utils/getInput"

const map = getInput(12).split("\n").map(val => val.split(""));
const width = map[0].length;
const height = map.length;
const scannedMap = Array.from({length: height}, () => Array(width).fill(false));

function calcRegionMetrics(x: number, y: number): {area: number, perimeter: number} {
  if (scannedMap[y][x]) return {area: 0, perimeter: 0};

  const regionChar = map[y][x];
  scannedMap[y][x] = true;
  let area = 1;
  let perimeter = 0;

  if (x != 0 && map[y][x - 1] === regionChar) {
    const c = calcRegionMetrics(x - 1, y)
    area += c.area;
    perimeter += c.perimeter;
  } else {
    perimeter++;
  }

  if (x != width - 1 && map[y][x + 1] === regionChar) {
    const c = calcRegionMetrics(x + 1, y)
    area += c.area;
    perimeter += c.perimeter;
  } else {
    perimeter++;
  }

  if (y != 0 && map[y - 1][x] === regionChar) {
    const c = calcRegionMetrics(x, y - 1)
    area += c.area;
    perimeter += c.perimeter;
  } else {
    perimeter++;
  }

  if (y != height - 1 && map[y + 1][x] === regionChar) {
    const c = calcRegionMetrics(x, y + 1)
    area += c.area;
    perimeter += c.perimeter;
  } else {
    perimeter++;
  }

  return {area, perimeter};
}

let total = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (scannedMap[y][x]) continue;

    const c = calcRegionMetrics(x,y);
    total += c.area * c.perimeter
  }
}


console.log(total);