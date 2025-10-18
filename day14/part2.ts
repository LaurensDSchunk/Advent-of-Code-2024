import getInput from "../utils/getInput";

const robots = getInput(14)
  .split("\n")
  .map((val) =>
    [...val.matchAll(/-?\d+/g)].map((out) => Number.parseInt(out[0]))
  )
  .map((val) => {
    const [px, py, vx, vy] = val;
    return { px, py, vx, vy };
  });


const width = 101;
const height = 103;

function overflow(value: number, min: number, max: number): number {
  const range = max - min;
  return ((value - min) % range + range) % range + min;
}

function step() {
  for (let robot of robots) {
    robot.px = overflow(robot.px + robot.vx, 0, width);
    robot.py = overflow(robot.py + robot.vy, 0, height);
  }
}

function hasNoOverlaps() {
  const map = Array.from({length: height}, () => Array(width).fill(0));

  for (let robot of robots) {
    if (map[robot.py][robot.px] === 1) return false;
    map[robot.py][robot.px]++;
  }

  return true;
}

let seconds = 0;
while (!hasNoOverlaps()) {
  step();
  seconds++;
}

console.log(seconds);