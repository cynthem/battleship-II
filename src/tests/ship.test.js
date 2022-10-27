import Ship from '../factories/Ship';

test('takes a hit', () => {
    const battleship = new Ship('battleship', 4);
    battleship.isHit(44);
    expect(battleship.hits).toEqual(1);
});