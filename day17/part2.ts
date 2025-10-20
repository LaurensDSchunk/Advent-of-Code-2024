const program = [2n, 4n, 1n, 4n, 7n, 5n, 4n, 1n, 1n, 4n, 5n, 5n, 0n, 3n, 3n, 0n];

function runComputer(a: bigint) {
  let output: bigint[] = [];
  let b: bigint = 0n;
  let c: bigint = 0n;

  while (true) {
    b = a % 8n; // B is last 3 bits of A
    b = b ^ 4n;
    b = b ^ (a / (2n ** b)); // B is XOR'd with a shifted right B bits
    b = b ^ 4n;
    output.push(b % 8n); // Output the last 3 bits of B
    a = a / (2n ** 3n); // A is shifted right 3 bits
    if (a === 0n) break;
  }

  return output;
}

let goodAList: bigint[] = [0n];

for (let outputLen = 1; outputLen <= program.length; outputLen++) {
  const newGoodA = [];
  for (let goodA of goodAList) {
    goodA = goodA << 3n;
    for (let aOffset = 0n; aOffset <= 7n; aOffset++) {
      const output = runComputer(goodA + aOffset);

      let good = true;
      for (let i = 0; i < outputLen; i++) {
        const programIndex = program.length - outputLen + i;
        if (output[i] !== program[programIndex]) good = false;
      }

      if (good) newGoodA.push(goodA + aOffset);
    }
  }
  goodAList = newGoodA;
}


function minBigInt(values: BigInt[]) {
  if (values.length === 0) {
    return undefined; // Or throw an error, depending on desired behavior
  }
  let minValue = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] < minValue) {
      minValue = values[i];
    }
  }
  return minValue;
}


console.log(minBigInt(goodAList))