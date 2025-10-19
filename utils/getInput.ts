import { readFileSync } from "fs";
import { join } from "path";

export default function getInput(day: number, test?: boolean): string {
  const dayStr = day.toString().padStart(2, "0");
  const fileName = test === true? "test.txt" : "input.txt";
  const filePath = join(__dirname, `../day${dayStr}/${fileName}`);
  return readFileSync(filePath, "utf-8").trim();
}