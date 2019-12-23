import { chunkArray, printResult, readFile } from '../utils';

class Layer {
  public count: Map<number, number>;

  constructor(public pixels: number[]) {
    this.count = this.pixels.reduce((count: Map<number, number>, pixel: number) => {
      const current = count.get(pixel) || 0;
      count.set(pixel, current + 1);
      return count;
    }, new Map());
  }

  getPixelCount(pixelValue: number): number {
    return this.count.get(pixelValue) || 0
  }
}

const input = readFile(`${__dirname}/input.txt`).split('').map(s => Number(s));

const layerSize = 25 * 6;
const layers = chunkArray<number>(input, layerSize).map(layer => new Layer(layer));

let minVal = Number.MAX_SAFE_INTEGER;
let minLayer: Layer | null = layers[0];

layers.forEach(layer => {
  const zeroes = layer.getPixelCount(0);
  if (zeroes < minVal) {
    minVal = zeroes;
    minLayer = layer;
  }

})
const result1 = minLayer.getPixelCount(1) * minLayer.getPixelCount(2);

printResult(8, result1);

