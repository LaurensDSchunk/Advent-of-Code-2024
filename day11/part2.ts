import getInput from "../utils/getInput"

//const input = [125, 17]
const input = getInput(11).split(" ").map(val => Number.parseInt(val));

let stones = new Map<number, number>()
for (let stone of input) {
  stones.set(stone, 1);
}

function blink() {
  const newStones = new Map<number, number>()
  function addToMap(key: number, amount: number) {
    newStones.set(key, (newStones.get(key) ?? 0) + amount);
  }

  for (let [stone, count] of stones) {
    if (stone === 0) {
      addToMap(1, count);
      continue;
    }

    const stoneString = stone.toString();
    if (stoneString.length % 2 === 0) {
      const first = Number.parseInt(stoneString.slice(0, stoneString.length / 2));
      const second = Number.parseInt(stoneString.slice(stoneString.length / 2));

      addToMap(first, count)
      addToMap(second, count)
      continue;
    }

    addToMap(stone * 2024, count);
  }

  stones = newStones;
}


for (let i = 0; i < 75; i++) {
  blink();
}

let total = 0;
for (let [_, count] of stones) {
  total += count;
}

console.log(total);