import getInput from "../utils/getInput"

const input = getInput(5).split("\n");

const seperatorIndex = input.findIndex((v) => v == "");
const rawRules = input.slice(0, seperatorIndex);

const rules = rawRules.map((v) => {
  const data = [...v.match(/(\d+)\|(\d+)/)];
  return { first: Number.parseInt(data[1]), last: Number.parseInt(data[2]) };
});

const updates: number[][] = input
  .slice(seperatorIndex + 1)
  .map((v) => v.split(",").map((s) => Number.parseInt(s)));

function checkUpdate(update: number[]): {good: boolean, firstIndex: number, lastIndex: number} {
  for (let rule of rules) {
    const firstPageIndex = update.findIndex((p) => p == rule.first);
    const lastPageIndex = update.findIndex((p) => p == rule.last);

    if (firstPageIndex === -1 || lastPageIndex === -1) continue;

    if (firstPageIndex > lastPageIndex) {
      return {good: false, firstIndex: firstPageIndex, lastIndex: lastPageIndex}
    }
  }

  return {good: true, firstIndex: -1, lastIndex: -1}
}


let total = 0;
for (let update of updates) {
  let done = false
  let wasBad = false;
  while (!done) {
    const result = checkUpdate(update);
    done = result.good;
    if (!done) {
      wasBad = true;
      const a = update[result.firstIndex];
      update[result.firstIndex] = update[result.lastIndex];
      update[result.lastIndex] = a;
    }
  }

  if (wasBad) total+= update[Math.floor(update.length / 2)]

}

console.log(total);