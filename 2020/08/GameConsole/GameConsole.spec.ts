import { GameConsole, Instruction, Opcode } from '.';

describe('Instruction', () => {
  it('can swap opcodes', () => {
    const opA = Opcode.ACC;
    const opB = Opcode.JMP;
    const instr = new Instruction(opA, 1);
    instr.changeOpcode(opB);
    expect(instr.opcode).toBe(Opcode.JMP);
    expect(instr.arg).toBe(1);
  });
});

describe('GameConsole', () => {
  it('reads a program from a file', () => {
    const game = new GameConsole(`${__dirname}/testInit.txt`);
    expect(game.memory).toEqual([
      new Instruction(Opcode.NOP, 0),
      new Instruction(Opcode.ACC, 1),
      new Instruction(Opcode.JMP, 4),
    ]);
  });

  it('steps through a program', () => {
    const game = new GameConsole(`${__dirname}/stepTest.txt`);
    expect(game.acc).toBe(0);
    expect(game.pointer).toBe(0);
    game.step();
    expect(game.acc).toBe(0);
    expect(game.pointer).toBe(1);
    game.step();
    expect(game.acc).toBe(1);
    expect(game.pointer).toBe(2);
  });

  it('runs a program and updates flags', () => {
    const game = new GameConsole(`${__dirname}/validTest.txt`);
    game.run();
    expect(game.completed).toBeTruthy();
  });
  
  it('ends if it detects a loop and updates flags', () => {
    const game = new GameConsole(`${__dirname}/loopTest.txt`);
    game.run();
    expect(game.loopDetected).toBeTruthy()
  });
  
  it('throws if it executes an unknown instruction', () => {
    const game = new GameConsole(`${__dirname}/testInit.txt`);
    expect(() => game.execute(new Instruction('invalid' as Opcode, 1))).toThrow(`Unknown opcode invalid`);
  });
  
  it('resets', () => {
    const game = new GameConsole(`${__dirname}/validTest.txt`);
    game.run();
    expect(game.completed).toBeTruthy();
    expect(game.ended).toBeTruthy();
    expect(game.pointer).toBe(9);
    expect(game.acc).toBe(8);
    game.reset();
    expect(game.completed).toBeFalsy();
    expect(game.ended).toBeFalsy();
    expect(game.pointer).toBe(0);
    expect(game.acc).toBe(0);
  });

  it('can swap JMP and NOOP instructions, ignoring ACC', () => {
    const game = new GameConsole(`${__dirname}/testInit.txt`);
    game.swapJmpNoop(0);
    game.swapJmpNoop(1);
    game.swapJmpNoop(2);
    expect(game.memory[0]).toEqual(new Instruction(Opcode.JMP, 0));
    expect(game.memory[1]).toEqual(new Instruction(Opcode.ACC, 1));
    expect(game.memory[2]).toEqual(new Instruction(Opcode.NOP, 4));
  });
  
  it('resets memory if modified', () => {
    const initMemory = [
      new Instruction(Opcode.NOP, 0),
      new Instruction(Opcode.ACC, 1),
      new Instruction(Opcode.JMP, 4),
    ];

    const game = new GameConsole(`${__dirname}/testInit.txt`);
    expect(game.memory).toEqual(initMemory);
    game.swapJmpNoop(0);
    expect(game.memory).not.toEqual(initMemory);
    game.reset();
    expect(game.memory).toEqual(initMemory);
  });

});