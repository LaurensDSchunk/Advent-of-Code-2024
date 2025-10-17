import getInput from "../utils/getInput"

const input = getInput(1).split("\n");

const listA = [];
const listB = [];

for (let line of input) {
  const [a,b] = line.split("   ");
  listA.push(Number.parseInt(a));
  listB.push(Number.parseInt(b));
}

const sortedA = listA.sort();
const sortedB = listB.sort();

let total = 0;

for (let i = 0; i < sortedA.length; i++) {
  total += Math.abs(sortedA[i] -sortedB[i]);
}

console.log(total);