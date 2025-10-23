import getInput from "../utils/getInput";

const numbers = getInput(22)
  .split("\n")
  .map((v) => BigInt(Number.parseInt(v)));
const sequences: bigint[][] = Array.from({ length: numbers.length }, () =>
  Array(2001)
);

function calcSecretNumber(prevSecret: bigint) {
  let secret = ((prevSecret * 64n) ^ prevSecret) % 16777216n;
  secret = ((secret / 32n) ^ secret) % 16777216n;
  secret = ((secret * 2048n) ^ secret) % 16777216n;
  return secret;
}

for (let i = 0; i < numbers.length; i++) {
  let secret = numbers[i];
  sequences[i][0] = secret % 10n;
  for (let j = 0; j < 2000; j++) {
    secret = calcSecretNumber(secret);
    sequences[i][j + 1] = secret % 10n;
  }
}

const priceChanges: bigint[][] = Array.from({ length: sequences.length }, () =>
  Array(2000)
);
const maps: Map<string, bigint>[] = Array.from(
  { length: sequences.length },
  () => new Map<string, bigint>()
);
for (let j = 0; j < sequences.length; j++) {
  const sequence = sequences[j];
  const map = maps[j];
  for (let i = 1; i < sequence.length; i++) {
    priceChanges[j][i] = sequence[i] - sequence[i - 1];
    if (i >= 4) {
      const key = String([
        priceChanges[j][i - 3],
        priceChanges[j][i - 2],
        priceChanges[j][i - 1],
        priceChanges[j][i],
      ]);
      if (map.has(key)) continue;
      map.set(key, sequence[i]);
    }
  }
}

let maxTotal = 0n;

for (let num1 = -9n; num1 <= 9n; num1++) {
  for (let num2 = -9n; num2 <= 9n; num2++) {
    for (let num3 = -9n; num3 <= 9n; num3++) {
      for (let num4 = -9n; num4 <= 9n; num4++) {
        const pattern = [num1, num2, num3, num4];
        const key = String(pattern);
        let total = 0n;
        for (const map of maps) {
          if (map.has(key)) total += map.get(key);
        }

        if (total > maxTotal) {
          maxTotal = total;
        }
      }
    }
  }
}

console.log(maxTotal);
