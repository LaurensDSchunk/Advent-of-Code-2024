import getInput from "../utils/getInput"

const input = getInput(3);

let total = 0;
const mulInputs = [...input.matchAll(/mul\((\d+)\,(\d+)\)/mg)].map(value=>[value[1], value[2]]);

for (let inputs of mulInputs) {
  total+= Number.parseInt(inputs[0]) * Number.parseInt(inputs[1]);
}



console.log(total);