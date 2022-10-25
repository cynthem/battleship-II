import Ship from './Ship';

export default class Gameboard {
    constructor() {
        this.board = [];
        this.sunk = 0;
        this.carrier = new Ship('carrier', 5);
        this.battleship = new Ship('battleship', 4);
        this.cruiser = new Ship('cruiser', 3);
        this.submarine = new Ship('submarine', 3);
        this.destroyer = new Ship('destroyer', 2);
        this.init();
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.board.push({ index: i, shipId: 'none', isSunk: false, allSunk: false });
        }

        this.placeShips(this.carrier);
        this.placeShips(this.battleship);
        this.placeShips(this.cruiser);
        this.placeShips(this.submarine);
        this.placeShips(this.destroyer);
    }

    placeShips(ship) {
        let startChoices;
        const startPlace = startChoices[Math.floor(Math.random() * startChoices.length)];

        if (ship === this.carrier) {
            startChoices = [2, 12, 22];
            const location = [startPlace, startPlace + 1, startPlace + 2, startPlace + 3, startPlace + 4];
            location.forEach(cell => this.board[cell].shipId = 'carrier');
        }

        if (ship === this.battleship) {
            startChoices = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69];
            const location = [startPlace, startPlace + 10, startPlace + 20, startPlace + 30];
            location.forEach(cell => this.board[cell].shipId = 'battleship');
        }

        if (ship === this.cruiser) {
            startChoices = [42, 43, 44, 52, 53, 54, 62, 63, 64];
            const location = [startPlace, startPlace + 1, startPlace + 2];
            location.forEach(cell => this.board[cell].shipId = 'cruiser');
        }

        if (ship === this.submarine) {
            startChoices = [0, 10, 20, 30, 40, 50, 60, 70];
            const location = [startPlace, startPlace + 10, startPlace + 20];
            location.forEach(cell => this.board[cell].shipId = 'submarine');
        }

        if (ship === this.destroyer) {
            startChoices = [82, 83, 84, 85, 92, 93, 94, 95];
            const location = [startPlace, startPlace + 1];
            location.forEach(cell => this.board[cell].shipId = 'destroyer');
        }
    }

    receiveAttack(index) {
        let status = this.board[index];

        if (status.shipId === 'none') {
            return status;
        }

        if (status.shipId === 'carrier') {
            this.carrier.isHit();
            if (!this.carrier.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }
        }

        if (status.shipId === 'battleship') {
            this.battleship.isHit();
            if (!this.battleship.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }
        }

        if (status.shipId === 'cruiser') {
            this.cruiser.isHit();
            if (!this.cruiser.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }
        }

        if (status.shipId === 'submarine') {
            this.submarine.isHit();
            if (!this.submarine.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }
        }

        if (status.shipId === 'destroyer') {
            this.destroyer.isHit();
            if (!this.destroyer.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }
        }
    }

    allSunk() {
        return this.sunk === 5;
    }
}