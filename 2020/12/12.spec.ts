import { Direction, Ship } from '.';

describe('Ship', () => {
  let ship: Ship;
  beforeEach(() => {
    ship = new Ship(`${__dirname}/test.txt`);
  });

  describe('Rotating', () => {
    it('initialises to East', () => {
      expect(ship.facing).toBe(Direction.E);
    });

    it('turns 90 degrees right', () => {
      ship.turn(90);
      expect(ship.facing).toBe(Direction.S);
      ship.turn(90);
      expect(ship.facing).toBe(Direction.W);
      ship.turn(90);
      expect(ship.facing).toBe(Direction.N);
      ship.turn(90);
      expect(ship.facing).toBe(Direction.E);
    });

    it('turns 90 degrees left', () => {
      ship.turn(-90);
      expect(ship.facing).toBe(Direction.N);
      ship.turn(-90);
      expect(ship.facing).toBe(Direction.W);
      ship.turn(-90);
      expect(ship.facing).toBe(Direction.S);
      ship.turn(-90);
      expect(ship.facing).toBe(Direction.E);
    });

    it('turns 180 degrees left', () => {
      ship.turn(180);
      expect(ship.facing).toBe(Direction.W);
      ship.turn(180);
      expect(ship.facing).toBe(Direction.E);
    });

    it('turns 180 degrees right', () => {
      ship.turn(-180);
      expect(ship.facing).toBe(Direction.W);
      ship.turn(-180);
      expect(ship.facing).toBe(Direction.E);
    });

    it('turns 270 degrees right', () => {
      ship.turn(270);
      expect(ship.facing).toBe(Direction.N);
      ship.turn(270);
      expect(ship.facing).toBe(Direction.W);
    });

    it('turns 270 degrees left', () => {
      ship.turn(-270);
      expect(ship.facing).toBe(Direction.S);
      ship.turn(-270);
      expect(ship.facing).toBe(Direction.W);
    });
  });

  describe('Travel', () => {
    it('follows instructions', () => {
      ship.travel();
      expect(ship.position).toEqual({ east: 17, north: -8 });
    });
  })
});
