import getInput from "../utils/getInput";

const input = getInput(7).split("\n");
const equations = input.map((val) => {
  const [rawAnswer, rawparts] = val.split(": ");
  const answer = Number.parseInt(rawAnswer);
  const parts = rawparts.split(" ").map((p) => Number.parseInt(p));
  return { answer, parts };
});

let result = 0;

for (let equation of equations) {
  const spaceCount = equation.parts.length - 1;
  const totalVariations = Math.pow(3, spaceCount);

  // Search every variation of the symbols
  for (let i = 0; i < totalVariations; i++) {
    // Pad start makes sure symbols still exist for small values of i
    const operations = i
      .toString(3)
      .padStart(spaceCount, "0")
      .replace(/0/g, "+")
      .replace(/1/g, "*")
      .replace(/2/g, "|");

    let total = equation.parts[0];
    for (let j = 1; j < equation.parts.length; j++) {
      if (operations[j - 1] === "+") {
        total += equation.parts[j];
      } else if (operations[j-1] === "*") {
        total *= equation.parts[j];
      } else {
        const strTotal = total.toString();
        total = Number.parseInt(strTotal + equation.parts[j]);
      }
    }

    if (total === equation.answer) {
      result += equation.answer;
      break;
    }
  }
}

console.log(result);
