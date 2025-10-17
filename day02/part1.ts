import getInput from "../utils/getInput";

const input = getInput(2).split("\n");

const data = input.map((val) => val.split(" ").map((v) => Number.parseInt(v)));

let safeCount = 0;

for (let row of data) {
  const ascending = row[1] - row[0] > 0;
  let safe = true;

  for (let i = 0; i < row.length - 1; i++) {
    if (
      (ascending && (row[i + 1] - row[i] > 3 || row[i + 1] - row[i] < 1)) ||
      (!ascending && (row[i] - row[i + 1] > 3 || row[i] - row[i + 1] < 1))
    ) {
      safe = false;
      break;
    }
  }

  if (safe) safeCount++;
}

console.log(safeCount);
