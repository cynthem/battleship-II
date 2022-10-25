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

    $(window).on('load', () => {
        $playerBoard.addClass('grow');
        $computerBoard.addClass('grow');
        
        setTimeout(() => {
            $('.new-game').removeClass('hide');
            $('.new-game').addClass('move-up');
            $playerBoard.removeClass('grow');
            $computerBoard.removeClass('grow');
        }, 1000);

        setTimeout(() => {
            $('.new-game').removeClass('move-up');
        }, 2000);
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
        $('.new-game-form').addClass('fadeOut');

        setTimeout(() => {
            $('.new-game-form').removeClass('fadeOut');
            $('.new-game').addClass('hide');
            $('.gameplay-text').removeClass('hide');
        }, 500);
        
        setTimeout(() => {
            beginGame($inputName, 'computer');
        }, 1000);

        setTimeout(() => {
            $textTop.fadeIn(1000);
        }, 2000);
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

            jQuery($computerBoard[cell.index]).css('cursor', 'pointer');

            jQuery($computerBoard[cell.index]).on('click', event => {
                const hitCell = jQuery(event.currentTarget);
                hitCell.addClass('active');
                userTurn(hitCell);
            });
        });
    };

    //const $playerBoard = $('.player-board').children();
    //const $computerBoard = $('.computer-board').children();
    //const $textTop = $('.text-top');
    //const $textBottom = $('.text-bottom');
    //const $textResults = $("<p></p>");
    //const $replayBtn = $('.replay-btn');

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

    function userTurn(hitCell) {
        setTimeout(() => {
            hitCell.removeClass('active');
        }, 100);
        
        jQuery($textTop).addClass('fadeOut');
        jQuery($textBottom).addClass('fadeOut');

        setTimeout(() => {
            jQuery($textTop).removeClass('fadeOut');
            jQuery($textBottom).removeClass('fadeOut');
            jQuery($textTop).addClass('invisible');
            jQuery($textBottom).addClass('invisible');
            jQuery($textTop).text('');
            jQuery($textBottom).text('');
        }, 200);

        const hitCellClass = hitCell.attr('class');
        const stringIndex = hitCellClass.slice(9, 11);
        const hitIndex = Number(stringIndex);
        
        computerStatus = computerPlayer.takeHit(hitIndex);

        if (computerStatus.shipId === 'none') {
            setTimeout(() => {
                jQuery($textTop).text('You fire a shot into enemy waters . . .');
                jQuery($textTop).removeClass('invisible');
                jQuery($textTop).addClass('fadeIn');
                hitCell.addClass('blueToYellow');
            }, 500);

            setTimeout(() => {
                hitCell.attr('id', 'ship');
                hitCell.removeClass('blueToYellow');
            }, 1000);

            setTimeout(() => {
                jQuery($textBottom).text('and it\'s a miss.');
                jQuery($textBottom).removeClass('invisible');
                jQuery($textBottom).addClass('fadeIn');
            }, 1500);
            
        }

       
    };
});