import Ship from '../factories/Ship';

test('takes a hit', () => {
    const battleship = new Ship('battleship', 4);
    battleship.isHit(44);
    expect(battleship.hits).toEqual(1);
});

test('takes multiple hits', () => {
    const cruiser = new Ship('cruiser', 3);
    cruiser.isHit(30);
    cruiser.isHit(40);
    expect(cruiser.hits).toEqual(2);
});

test('determines boat is sunk', () => {
    const destroyer = new Ship('destroyer', 2);
    destroyer.isHit(0);
    destroyer.isHit(1);
    expect(destroyer.isSunk()).toBe(true);
});

test('determines boat is not sunk', () => {
    const submarine = new Ship('submarine', 3);
    submarine.isHit(0);
    submarine.isHit(99);
    expect(submarine.isSunk()).toBe(false);
});