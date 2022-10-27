import Player from '../factories/Player';

describe('Player functions', () => {
    let newPlayer;

    beforeEach(() => {
        newPlayer = new Player('test');
    });

    it('takes a hit and returns the same index', () => {
        newPlayer.takeHit(20);
        expect(newPlayer.gameboard.board[20].index).toEqual(20);
    });

    it('takes a hit in an empty space and returns a shipId of "none"', () => {
        const testHit = newPlayer.takeHit(1);
        expect(testHit.shipId).toEqual('none');
    });

    it('takes a hit and returns false for isSunk', () => {
        const testHit = newPlayer.takeHit(0);
        expect(testHit.isSunk).toEqual(false);
    });
});