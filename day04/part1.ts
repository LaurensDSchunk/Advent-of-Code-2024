import getInput from "../utils/getInput"

const input = getInput(4).split("\n");

let total = 0;

const offsets = [
      [{x: 0, y: 0, v: "X"}, {x: 0, y: 1, v: "M"}, {x: 0, y: 2, v: "A"}, {x: 0, y: 3, v: "S"}],
      [{x: 0, y: 0, v: "S"}, {x: 0, y: 1, v: "A"}, {x: 0, y: 2, v: "M"}, {x: 0, y: 3, v: "X"}],
      [{x: 0, y: 0, v: "X"}, {x: 1, y: 0, v: "M"}, {x: 2, y: 0, v: "A"}, {x: 3, y: 0, v: "S"}],
      [{x: 0, y: 0, v: "S"}, {x: 1, y: 0, v: "A"}, {x: 2, y: 0, v: "M"}, {x: 3, y: 0, v: "X"}],
      [{x: 0, y: 0, v: "X"}, {x: 1, y: 1, v: "M"}, {x: 2, y: 2, v: "A"}, {x: 3, y: 3, v: "S"}],
      [{x: 0, y: 0, v: "S"}, {x: 1, y: 1, v: "A"}, {x: 2, y: 2, v: "M"}, {x: 3, y: 3, v: "X"}],
      [{x: 0, y: 3, v: "X"}, {x: 1, y: 2, v: "M"}, {x: 2, y: 1, v: "A"}, {x: 3, y: 0, v: "S"}],
      [{x: 0, y: 3, v: "S"}, {x: 1, y: 2, v: "A"}, {x: 2, y: 1, v: "M"}, {x: 3, y: 0, v: "X"}],
    ];

for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[0].length; col++) {
    for (let kernel of offsets) {
      let success = true;

      for (let offset of kernel) {
        if (row + offset.y >= input.length || col+offset.x >= input[0].length) {
          success = false;
          break;
        }
        if (input[row+offset.y][col+offset.x] != offset.v) {
          success = false;
          break;
        }
      }

      if (success) total++;
    }
  }
}



console.log(total);