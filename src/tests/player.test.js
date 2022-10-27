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
});