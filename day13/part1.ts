import getInput from "../utils/getInput";

const games = getInput(13)
  .split("\n\n")
  .map((val) => [...val.matchAll(/\d+/g)].map((out) => Number.parseInt(out[0])))
  .map((val) => ({
    buttonA: { x: val[0], y: val[1] },
    buttonB: { x: val[2], y: val[3] },
    target: { x: val[4], y: val[5] },
  }));

let totalTokens = 0;
for (let {buttonA, buttonB, target} of games) {
  const maxA = Math.floor(Math.min(100, target.x / buttonA.x, target.y / buttonA.y));
  const maxB = Math.floor(Math.min(100, target.x / buttonB.x, target.y / buttonB.y));
  
  for (let aCount = 0; aCount <= maxA; aCount++) {
    const remainingX = target.x - buttonA.x * aCount;
    const remainingY = target.y - buttonA.y * aCount;

    const bCountX = remainingX / buttonB.x
    const bCountY = remainingY / buttonB.y

    if (bCountX === bCountY && bCountX <= maxB && remainingX % buttonB.x === 0) {
      totalTokens += bCountX + 3 * aCount;
    }
  }
}

console.log(totalTokens);
