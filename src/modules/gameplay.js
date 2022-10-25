import Player from "../factories/Player";
import ComputerMove from "../factories/ComputerMove";

export default function gameplay() {
    let userPlayer;
    let computerPlayer;
    let computerMoves;
    let nextComputerMove;
    let playerStatus;
    let computerStatus;

    function beginGame(userName, computerName) {
        userPlayer = new Player(userName);
        computerPlayer = new Player(computerName);
        computerMoves = new ComputerMove();

        nextComputerMove = Math.floor(Math.random() * 100);
        playerStatus = userPlayer.takeHit(nextComputerMove);
    }

    return {
        beginGame
    };
};