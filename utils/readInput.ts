import { readFileSync } from "fs";
import { join } from "path";

export default function readInput(day: number): string {
  const dayStr = day.toString().padStart(2, "0");
  const filePath = join(__dirname, `../../day${dayStr}/input.txt`);
  return readFileSync(filePath, "utf-8").trim();
}