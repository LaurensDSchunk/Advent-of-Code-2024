import getInput from "../utils/getInput";

const map = getInput(8)
  .split("\n")
  .map((val) => val.split(""));
const width = map[0].length;
const height = map.length;

const antinodeMap = Array.from({ length: height }, () =>
  Array(width).fill(false)
);

const locations = new Map<string, { x: number; y: number }[]>();
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const letter = map[y][x];
    if (letter === ".") continue;

    if (locations.get(letter) === undefined) {
      locations.set(letter, [{ x, y }]);
      continue;
    }

    locations.get(letter).push({x,y});
  }
}

for (let [_, points] of locations) {
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const pointA = points[i];
      const pointB = points[j];

      antinodeMap[pointA.y][pointA.x] = true;
      antinodeMap[pointB.y][pointB.x] = true;

      const xDist = pointA.x - pointB.x;
      const yDist = pointA.y - pointB.y;

      let a = {x: pointA.x + xDist, y: pointA.y + yDist};
      while (a.x >= 0 && a.x < width && a.y >= 0 && a.y < height) {
        antinodeMap[a.y][a.x] = true;
        a.x += xDist;
        a.y += yDist;
      }

      const b = {x: pointB.x - xDist, y: pointB.y - yDist};
      while (b.x >= 0 && b.x < width && b.y >= 0 && b.y < height) {
        antinodeMap[b.y][b.x] = true;
        b.x -= xDist;
        b.y -= yDist;
      }
    }
  }
}

// Count unique antinodes
let uniqueAntinodes = 0;

for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    if (antinodeMap[row][col]) uniqueAntinodes++;
  }
}

console.log(uniqueAntinodes);
