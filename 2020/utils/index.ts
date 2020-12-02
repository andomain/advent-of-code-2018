const fs = require('fs');

export const readFile = (filePath: string, enc = 'utf-8'): string => fs.readFileSync(filePath, enc).trim();
export const readFileLines = (filePath: string, enc = 'utf-8'): string[] => readFile(filePath, enc).split('\n');

export const numBetween = (num: number, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) => {
  return num <= max && num >= min;
}