import getInput from "../utils/getInput";

type Section = { length: number; id: number | null };

const input = getInput(9).split("").map(v => Number.parseInt(v));

let isFile = false;
let currentId = -1;
const fileSystem: Section[] = input
  .map((val) => {
    isFile = !isFile;
    if (!isFile) return { length: val, id: null };
    currentId++;
    return { length: val, id: currentId };
  })
  .filter((section) => section.length != 0);

let leftIndex = 0;

while (leftIndex < fileSystem.length) {
  if (fileSystem[leftIndex].id !== null) {
    leftIndex++;
    continue;
  }

  let noChange = true;
  const emptySection = fileSystem[leftIndex];
  for (
    let rightIndex = fileSystem.length - 1;
    rightIndex > leftIndex;
    rightIndex--
  ) {
    if (fileSystem[rightIndex].id === null) continue;

    const fullSection = fileSystem[rightIndex];
    if (emptySection.length === fullSection.length) {
      emptySection.id = fullSection.id;
      fullSection.id = null;
      break;
    }

    if (emptySection.length > fullSection.length) {
      const remainingSpace = emptySection.length - fullSection.length;
      emptySection.id = fullSection.id;
      emptySection.length = fullSection.length;
      fullSection.id = null;
      fileSystem.splice(leftIndex + 1, 0, {length: remainingSpace, id: null});
      break;
    }
  }

  if (noChange) leftIndex++;
}

const expandedFilesystem = fileSystem.map(val => Array(val.length).fill(val.id)).flat();

let total = 0;

for (let i = 0; i < expandedFilesystem.length; i++) {
  if (expandedFilesystem[i] === null) continue;

  total += i * expandedFilesystem[i];
}

console.log(total);