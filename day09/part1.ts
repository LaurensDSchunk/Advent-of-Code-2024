import getInput from "../utils/getInput"

const input = getInput(9).split("").map(v => Number.parseInt(v));
let isFile = false;
let currentId = -1;
const fileSystem: (number | null)[] = input.map(val => {
  isFile = !isFile;
  if (!isFile) return Array(val).fill(null);
  currentId++;
  return Array(val).fill(currentId)
}).flat()

let leftIndex = 0;
let rightIndex = fileSystem.length - 1;

while (leftIndex < rightIndex) {
  // Ensures the left index is empty
  if (fileSystem[leftIndex] !== null) {
    leftIndex++;
    continue;
  }

  // Ensures the right index has a value
  if (fileSystem[rightIndex] === null) {
    rightIndex--;
    continue;
  }

  fileSystem[leftIndex] = fileSystem[rightIndex];
  fileSystem[rightIndex] = null;
}

let total = 0;

for (let i = 0; i < fileSystem.length; i++) {
  if (fileSystem[i] === null) break;

  total += i * fileSystem[i];
}

console.log(total);