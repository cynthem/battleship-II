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

});