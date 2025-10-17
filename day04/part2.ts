import getInput from "../utils/getInput";

const input = getInput(4).split("\n");

let total = 0;

for (let y = 1; y < input.length - 1; y++) {
  for (let x = 1; x < input[0].length - 1; x++) {
    if (input[y][x] !=="A") continue;

    const diag1 = [input[y - 1][x - 1], input[y][x], input[y + 1][x + 1]].join("");
    const diag2 = [input[y - 1][x + 1], input[y][x], input[y + 1][x - 1]].join("");

    if ((diag1 === "MAS" || diag1 === "SAM") && (diag2 === "MAS" || diag2 === "SAM")) total++; 
  }
}

console.log(total);
