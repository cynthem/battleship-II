import Gameboard from './Gameboard';

export default class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
    }

    takeHit(index) {
        const status = this.gameboard.receiveAttack(index);
        return status;
    }
}