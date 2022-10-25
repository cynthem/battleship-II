import Player from "./factories/Player";
import ComputerMove from "./factories/ComputerMove";
import '../dist/style.css';
import 'jquery';

jQuery(function() {
    let playerName;
    let userPlayer;
    let computerPlayer;
    let computerMoves;
    let nextComputerMove;
    let playerStatus;
    let computerStatus;

    const $playerBoard = $('.player-board').children();
    const $computerBoard = $('.computer-board').children();
    const $textTop = $('.text-top');
    const $textBottom = $('.text-bottom');
    const $textResults = $("<p></p>");
    const $replayBtn = $('.replay-btn');

    const textPlayerTurn = 'You fire a shot into enemy waters . . .';
    const textComputerTurn = 'The enemy firest a shot . . .';
    const textComputerWait = 'The enemy is taking aim . . .';
    const textMiss = 'and it\'s a miss.';
    const textHit = 'and it\'s a hit!';
    const testPlayerSunk = ' You sunk their';
    const testComputerSunk = ' They sunk your';
    const textWinTop = `Congratuations ${playerName},`;
    const textWinBottom = 'You\'re the winner!';
    const textLoseTop = 'The enemy has won.';
    const textLoseBottom = 'Better luck next time.';

    $(window).on('load', () => {
        $playerBoard.addClass('grow');
        $computerBoard.addClass('grow');
        
        setTimeout(() => {
            $('.new-game').removeClass('hide');
            $('.new-game').addClass('move-up');
            $playerBoard.removeClass('grow');
            $computerBoard.removeClass('grow');
        }, 1001);

        setTimeout(() => {
            $('.new-game').removeClass('move-up');
        }, 1000);
    });

    $('.new-game-form').on('submit', event => {
        event.preventDefault();
        const $inputName = $('.new-game-input').val();
        $('.player-name').text($inputName);
        $('.player-name').removeClass('invisible');
        $('.player-name').addClass('fadeIn');
        $('.computer-name').removeClass('invisible');
        $('.computer-name').addClass('fadeIn');
        $textTop.text('Take your shot . . .');
        $('.new-game').addClass('hide');
        $('.gameplay-text').removeClass('hide');
        setTimeout(() => {
            $textTop.fadeIn(1500);
            beginGame($inputName, 'computer');
        }, 1000);
    });

    function beginGame(userName, computerName) {
        playerName = userName;
        userPlayer = new Player(userName);
        computerPlayer = new Player(computerName);
        computerMoves = new ComputerMove();

        nextComputerMove = Math.floor(Math.random() * 100);
        playerStatus = userPlayer.takeHit(nextComputerMove);

        userPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                jQuery($playerBoard[cell.index]).addClass('blueToYellow');
                setTimeout(() => {
                    jQuery($playerBoard[cell.index]).attr('id', 'ship');
                }, 500);
            }
        });

        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                jQuery($computerBoard[cell.index]).addClass('computer-ship');
            }
        });

        jQuery($computerBoard).each(cell => {
            jQuery($computerBoard[cell]).css('cursor', 'pointer');
            jQuery($computerBoard[cell]).on('click', event => {
                jQuery(event.currentTarget).addClass('active');
                //userTurn(event);
            });
        });
    };
});