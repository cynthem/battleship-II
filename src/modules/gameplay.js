import Player from "../factories/Player";
import ComputerMove from "../factories/ComputerMove";

export default function gameplay() {
    let userPlayer;
    let computerPlayer;
    let computerMoves;
    let nextComputerMove;
    let playerStatus;
    let computerStatus;

    const $playerBoard = $('.player-board > button');
    const $computerBoard = $('.computer-board > button');

    function beginGame(userName, computerName) {
        userPlayer = new Player(userName);
        computerPlayer = new Player(computerName);
        computerMoves = new ComputerMove();

        nextComputerMove = Math.floor(Math.random() * 100);
        playerStatus = userPlayer.takeHit(nextComputerMove);

        userPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                $playerBoard[cell.index].attr('id', 'ship');
            }
        });

        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                $computerBoard[cell.index].addClass('computer-ship');
            }
        });

        $computerBoard.forEach(cell => {
            cell.style.cursor = 'pointer';
            cell.on('click', userTurn);
        });
    }

    return {
        beginGame
    };
};