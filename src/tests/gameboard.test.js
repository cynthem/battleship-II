import Gameboard from '../factories/Gameboard';

describe('Gameboard functions', () => {
    let newBoard;

    beforeEach(() => {
        newBoard = new Gameboard();
    });

    it('initializes a board with 100 cells', () => {
        const boardLength = newBoard.board.length;
        expect(boardLength).toEqual(100);
    });
});