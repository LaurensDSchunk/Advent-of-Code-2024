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

// Helper function for debugging. Not used in the solution
function display() {
  const map = Array.from({length: height}, () => Array(width).fill(0));
  for (let robot of robots) {
    map[robot.py][robot.px]++;
  }

  for (let row of map) {
    console.log(row.join(""));
  }
}

for (let i = 0; i < 100; i++) {
  step();
}

let q1 = 0;
let q2 = 0;
let q3 = 0;
let q4 = 0;


for (let robot of robots) {
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  if (robot.px < centerX) {
    if (robot.py < centerY) {
      q1++;
    } else if (robot.py > centerY) {
      q2++;
    }
  } else if (robot.px > centerX) {
    if (robot.py < centerY) {
      q3++;
    } else if (robot.py > centerY) {
      q4++;
    }
  }
}

console.log(q1 * q2 * q3 * q4);
