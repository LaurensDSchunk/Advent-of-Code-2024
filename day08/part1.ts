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

for (let value of locations) {
  const points = value[1];

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const pointA = points[i];
      const pointB = points[j];

      const xDist = pointA.x - pointB.x;
      const yDist = pointA.y - pointB.y;

      const antinodeA = {x: pointA.x + xDist, y: pointA.y + yDist};
      const antinodeB = {x: pointB.x - xDist, y: pointB.y - yDist};

      [antinodeA,antinodeB].forEach(point => {
        if (point.x < 0 || point.x >= width || point.y < 0 || point.y >= height) return;

        antinodeMap[point.y][point.x] = true;
      })
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
