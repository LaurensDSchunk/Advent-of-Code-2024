import getInput from "../utils/getInput";

const games = getInput(13)
  .split("\n\n")
  .map((val) => [...val.matchAll(/\d+/g)].map((out) => Number.parseInt(out[0])))
  .map((val) => ({
    xA: val[0],
    yA: val[1],
    xB: val[2],
    yB: val[3],
    xT: val[4] + 10000000000000,
    yT: val[5] + 10000000000000
  }));

let totalTokens = 0;
for (let {xA, yA, xB, yB, xT, yT} of games) {
  
  const cB = (xT * yA - xA * yT) / (yA * xB - xA * yB);
  const cA = (yT - yB * cB) / yA;
  
  if (Number.isInteger(cB) && Number.isInteger(cA)) {
    totalTokens += cB + 3*cA;
  }
}

console.log(totalTokens);
