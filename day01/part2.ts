import getInput from "../utils/getInput"

const input = getInput(1).split("\n");

const listA = [];
const listB = [];

for (let line of input) {
  const [a,b] = line.split("   ");
  listA.push(Number.parseInt(a));
  listB.push(Number.parseInt(b));
}

let total = 0;

for (let location of listA) {
  total += location * listB.filter(val => val === location).length
}

console.log(total)