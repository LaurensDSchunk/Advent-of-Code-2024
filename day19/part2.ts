import getInput from "../utils/getInput"

const [rawDesigns, rawPatterns] = getInput(19).split("\n\n");
const designs = rawDesigns.split(", ")
const patterns = rawPatterns.split("\n")
const memo = new Map<string, number>()

function getPatternVariationCount(pattern: string): number {
  if (pattern.length === 0) return 1;
  if (memo.has(pattern)) return memo.get(pattern);

  const possibleDesigns = designs.filter(val => pattern.startsWith(val));

  let totalVariations = 0;
  for (let possibleDesign of possibleDesigns) {
    const remainingPattern = pattern.substring(possibleDesign.length);
    totalVariations += getPatternVariationCount(remainingPattern);
  }

  memo.set(pattern, totalVariations);
  return totalVariations;
}


let possiblePatternCount = 0;

for (let pattern of patterns) {
  possiblePatternCount += getPatternVariationCount(pattern)
}

console.log(possiblePatternCount);