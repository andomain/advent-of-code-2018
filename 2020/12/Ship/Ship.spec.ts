import { getInstructions, Direction, Ship, Instruction, Command, InstructionType } from '.';

const instructions = getInstructions(`${__dirname}/test.txt`)

describe('Ship', () => {
  it('moves ship in the direction of waypoint', () => {
    const ship = new Ship([], { east: 1, north: 2 });

    ship.moveShip(10);
    expect(ship.position).toEqual({ east: 10, north: 20 });
  });
  
  it('gets the manhattan distance', () => {
    const ship = new Ship([], { east: 1, north: 2 });
    ship.moveShip(10);
    expect(ship.manhattan).toBe(30);
    
  })

  it('throws if unknown instruction executed', () => {
    const ship = new Ship([{ type: 'unknown' as InstructionType, value: 0 }]);
    expect(() => ship.followInstructions({east:0,north:0})).toThrow('Unknown instruction: unknown')
  })

  describe('Rotation', () => {
    it('rotates', () => {
      const ship = new Ship([], { east: 1, north: 2 });

      ship.rotateWaypoint(90);
      expect(ship.wayPoint).toEqual({ east: 2, north: -1 });
      ship.rotateWaypoint(180);
      expect(ship.wayPoint).toEqual({ east: -2, north: 1 });
      ship.rotateWaypoint(270);
      expect(ship.wayPoint).toEqual({ east: -1, north: -2 });
    });

    it('throws an error if incorrect rotation', () => {
      const ship = new Ship([]);
      expect(() => ship.rotateWaypoint(30)).toThrow('Unknown rotation angle: 30');
    });
  });

  describe('followInstructions', () => {
    it('follows instructions', () => {
      const ship = new Ship([
        { type: Command.R, value: 90 },
        { type: Command.F, value: 10 },
        { type: Command.L, value: 90 },
        { type: Direction.N, value: 1 },
        { type: Direction.E, value: 2 },
        { type: Direction.S, value: 3 },
        { type: Direction.W, value: 4 },
        { type: Command.F, value: 5 },
      ]);

      ship.followInstructions({ north: 1, east: 0 });

      expect(ship.position).toEqual({ east: 8, north: 3 });
      expect(ship.wayPoint).toEqual({ north: 1, east: 0 });
    });
  });

  describe('followWaypointInstructions', () => {
    const ship = new Ship([
      { type: Command.R, value: 90 },
      { type: Command.F, value: 10 },
      { type: Command.L, value: 90 },
      { type: Direction.N, value: 1 },
      { type: Direction.E, value: 2 },
      { type: Direction.S, value: 3 },
      { type: Direction.W, value: 4 },
      { type: Command.F, value: 1 },
    ]);

    ship.followWaypoint({ east: 0, north: 1 });

    expect(ship.position).toEqual({ east: 8, north: -1 });
    expect(ship.wayPoint).toEqual({ east: -2, north: -1 })
  });
});
