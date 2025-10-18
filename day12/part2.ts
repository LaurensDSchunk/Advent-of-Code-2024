import getInput from "../utils/getInput";

const map = getInput(12)
  .split("\n")
  .map((val) => val.split(""));
const width = map[0].length;
const height = map.length;
const scannedMap = Array.from({ length: height }, () =>
  Array(width).fill(false)
);

function calcRegionMetrics(
  x: number,
  y: number
): { area: number; corners: number } {
  if (scannedMap[y][x]) return { area: 0, corners: 0 };
  scannedMap[y][x] = true;
  const regionChar = map[y][x];

  // True if is a part of the region
  const surroundings = Array.from({ length: 3 }, () => Array(3).fill(false));
  for (let xOff = -1; xOff <= 1; xOff++) {
    for (let yOff = -1; yOff <= 1; yOff++) {
      const newX = x + xOff;
      const newY = y + yOff;

      if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
        surroundings[yOff + 1][xOff + 1] = false;
        continue;
      }

      if (map[newY][newX] === regionChar) {
        surroundings[yOff + 1][xOff + 1] = true;
      }
    }
  }

  function checkKernel(
    surroundings: boolean[][],
    kernel: (boolean | null)[][]
  ): boolean {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (kernel[y][x] === null) continue;

        if (surroundings[y][x] != kernel[y][x]) return false;
      }
    }

    return true;
  }

  let cornerCount = 0;

  [
    [
      [null, false, false],
      [null, true, false],
      [null, null, null],
    ],
    [
      [null, true, false],
      [null, true, true],
      [null, null, null],
    ],
    [
      [null, false, true],
      [null, true, false],
      [null, null, null],
    ],
  ].forEach((kernel) => {
    if (checkKernel(surroundings, kernel)) cornerCount++;
    kernel.reverse();
    if (checkKernel(surroundings, kernel)) cornerCount++;
    kernel.forEach((val) => val.reverse());
    if (checkKernel(surroundings, kernel)) cornerCount++;
    kernel.reverse();
    if (checkKernel(surroundings, kernel)) cornerCount++;
  });

  let area = 1;
  [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ].forEach(offset => {
    const newX = x + offset.x;
    const newY = y + offset.y;
    if (newX < 0 || newX >= width || newY < 0 || newY >= height) return;

    if (map[newY][newX] === regionChar) {
      const c = calcRegionMetrics(x + offset.x, y + offset.y);
      area += c.area;
      cornerCount += c.corners;
    }
  })
  
  return {area, corners: cornerCount};
}

let total = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (scannedMap[y][x]) continue;

    const c = calcRegionMetrics(x, y);
    total += c.area * c.corners;
  }
}

console.log(total);