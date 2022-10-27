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

    it('receives an attack on an empty space and returns a shipId of "none"', () => {
        const status = newBoard.receiveAttack(1);
        expect(status.shipId).toEqual('none');
    });

    it('returns false when no ships are sunk', () => {
        const sunkStatus = newBoard.allSunk();
        expect(sunkStatus).toEqual(false);
    });
});