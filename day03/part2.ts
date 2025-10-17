import getInput from "../utils/getInput";

const input = getInput(3);

let total = 0;

const inputs = [
  ...input.matchAll(/(mul)\((\d+)\,(\d+)\)|(do)\(\)|(don't)\(\)/gm),
];

let enabled = true;
for (let instruction of inputs) {
  if (instruction[4] === "do") enabled = true;
  if (instruction[5] === "don't") enabled = false;
  if (instruction[1] === "mul" && enabled)
    total += Number.parseInt(instruction[2]) * Number.parseInt(instruction[3]);
}

console.log(total);
