import getInput from "../utils/getInput";

const [rawRegisters, rawProgram] = getInput(17).split("\n\n");
const registers = rawRegisters
  .split("\n")
  .map((val) => Number.parseInt(val.match(/(\d+)/)[0]));
let [a, b, c] = registers;
const program = [...rawProgram.matchAll(/(\d+)/g)].map((val) =>
  Number.parseInt(val[0])
);

function calcComboOperand(operand: number): number {
  if (operand >= 0 && operand <= 3) return operand;
  if (operand === 4) return a;
  if (operand === 5) return b;
  if (operand === 6) return c;
}
let i = 0;

const instructions = [
  (operand, comboOperand) => {
    // 0: adv
    const numerator = a;
    const denominator = Math.pow(2, comboOperand);
    a = Math.floor(numerator / denominator);
  },
  (operand, comboOperand) => {
    // 1: bxl
    b = b ^ operand;
  },
  (operand, comboOperand) => {
    // 2: bst
    b = comboOperand % 8;
  },
  (operand, comboOperand) => {
    // 3: jnz
    if (a === 0) return;
    i = operand - 2; // Minus 2 to override the +2 in the loop
  },
  (operand, comboOperand) => {
    // 4: bxc
    b = b ^ c;
  },
  (operand, comboOperand) => {
    // 5: out
    output.push(comboOperand % 8);
  },
  (operand, comboOperand) => {
    // 6: bdv
    const numerator = a;
    const denominator = Math.pow(2, comboOperand);
    b = Math.floor(numerator / denominator);
  },
  (operand, comboOperand) => {
    // 7: cdv
    const numerator = a;
    const denominator = Math.pow(2, comboOperand);
    c = Math.floor(numerator / denominator);
  },
];

const output = [];

for (i = 0; i < program.length; i += 2) {
  const opcode = program[i];
  const operand = program[i + 1];
  const comboOperand = calcComboOperand(operand);

  instructions[opcode](operand, comboOperand);
}

console.log(output.join(","));
