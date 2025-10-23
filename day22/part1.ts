import getInput from "../utils/getInput"

const numbers = getInput(22).split("\n").map(v => BigInt(Number.parseInt(v)));


function calcSecretNumber(prevSecret: bigint) {
  let secret = ((prevSecret * 64n) ^ prevSecret) % 16777216n;
  secret = ((secret / 32n) ^ secret) % 16777216n;
  secret = ((secret * 2048n) ^ secret) % 16777216n;
  return secret;
}

let total = 0n;
for (let secret of numbers) {
  for (let i = 0; i < 2000; i++) {
    secret = calcSecretNumber(secret);
  }
  total += secret;
}

console.log(total)