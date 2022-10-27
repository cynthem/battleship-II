import ComputerMove from '../factories/ComputerMove';

describe('ComputerMove functions', () => {
    let nextMove;

    beforeEach(() => {
        nextMove = new ComputerMove();
    });

    it('initializes availableCells with 100 numbers', () => {
        const availableCells = nextMove.availableCells.length;
        expect(availableCells).toEqual(100);
    });

    it('receives a status with no ship and returns an index of a different number', () => {
        const status = {index: 66, shipId: 'none'};
        const index = nextMove.determineMove(status);
        expect(index).not.toEqual(66);
    });

    it('receives a status.index of 0 and returns 10', () => {
        const status = {index: 0, shipId: 'carrier'};
        const index = nextMove.determineMove(status);
        expect(index).toEqual(10);
    });

    it('receives a status.index of 1 and returns either 0 or 2', () => {
        const status = {index: 1, shipId: 'submarine'};
        const index = nextMove.determineMove(status);
        expect([0, 2]).toContain(index);
    });
});