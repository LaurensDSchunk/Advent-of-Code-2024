import getInput from "../utils/getInput"

const [rawDesigns, rawPatterns] = getInput(19).split("\n\n");
const designs = rawDesigns.split(", ")
const patterns = rawPatterns.split("\n")
const memo = new Map<string, boolean>();

function isPatternPossible(pattern: string): boolean {
  if (memo.has(pattern)) return memo.get(pattern);
  const possibleDesigns = designs.filter(val => pattern.startsWith(val));

  for (let possibleDesign of possibleDesigns) {
    const remainingPattern = pattern.substring(possibleDesign.length);
    if (remainingPattern.length === 0 || isPatternPossible(remainingPattern)) {
      memo.set(pattern, true);
      return true
    };
  }

  memo.set(pattern, false)
  return false;
}


let possiblePatternCount = 0;

for (let pattern of patterns) {
  if (isPatternPossible(pattern)) possiblePatternCount++;
}

console.log(possiblePatternCount);