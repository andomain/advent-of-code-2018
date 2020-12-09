export class XmasCracker {
  constructor (public stream: number[], public preambleSize: number) { }

  findInvalid(): number {
    const streamSize = this.stream.length;

    for (let i = this.preambleSize; i < streamSize; i++) {
      if (!this.validate(i)) {
        return this.stream[i];
      }
    }

    return -1;
  }

  validate(position: number): boolean {
    const candidate = this.stream[position];
    const parts = this.stream.slice(position - this.preambleSize, position)
      .filter(number => number < candidate)

    const validPartCount = parts.length;

    for (let i = 0; i < validPartCount; i++) {
      const a = parts[i];
      for (let j = 1; j < validPartCount; j++) {
        const b = parts[j];
        if (a + b === candidate) {
          return true;
        }
      }
    }

    return false;
  }

  weakness(invalidNumber: number): number {
    const streamLength = this.stream.length;
    for (let i = 0; i < streamLength - 2; i++) {
      let sum = this.stream[i];
      const parts = [sum];

      for (let j = i + 1; j < streamLength - 1; j++) {
        sum += this.stream[j];
        parts.push(this.stream[j]);
        if (sum === invalidNumber) {
          return Math.min(...parts) + Math.max(...parts);
        } else if (sum > invalidNumber) {
          break;
        }
      }
    }
    return -1;
  }
}