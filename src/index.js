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
    const $textBottomRight = $('<span></span>');
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
            $('.new-game').addClass('hide');
            $('.new-game-form').removeClass('fadeOut');
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

    function userTurn(hitCell) {
        setTimeout(() => {
            hitCell.removeClass('active');
            jQuery($textTop).addClass('fadeOut');
            jQuery($textBottom).addClass('fadeOut');
        }, 100);
        
        setTimeout(() => {
            jQuery($textTop).removeClass('fadeOut');
            jQuery($textBottom).removeClass('fadeOut');
            jQuery($textTop).addClass('invisible');
            jQuery($textBottom).addClass('invisible');
            jQuery($textTop).text('');
            jQuery($textBottom).text('');
        }, 600);

        const hitCellClass = hitCell.attr('class');
        const stringIndex = hitCellClass.slice(9, 11);
        const hitIndex = Number(stringIndex);
        
        computerStatus = computerPlayer.takeHit(hitIndex);

        if (computerStatus.shipId === 'none') {
            setTimeout(() => {
                jQuery($textTop).text('You fire a shot into enemy waters . . .');
                jQuery($textTop).removeClass('invisible');
                jQuery($textTop).addClass('fadeIn');
                hitCell.addClass('blueToGreen');
            }, 700);

            setTimeout(() => {
                hitCell.attr('id', 'no-hit');
                hitCell.removeClass('blueToGreen');
            }, 1200);

            setTimeout(() => {
                jQuery($textBottom).text('and it\'s a miss.');
                jQuery($textBottom).removeClass('invisible');
                jQuery($textBottom).addClass('fadeIn');
                computerTurn();
            }, 2000);
            
        } else {
            if (!computerStatus.isSunk) {
                setTimeout(() => {
                    jQuery($textTop).text('You fire a shot into enemy waters . . .');
                    jQuery($textTop).removeClass('invisible');
                    jQuery($textTop).addClass('fadeIn');
                    hitCell.addClass('blueToYellow');
                }, 700);

                setTimeout(() => {
                    hitCell.attr('id', 'ship');
                    hitCell.removeClass('blueToYellow');
                }, 1200);
    
                setTimeout(() => {
                    jQuery($textBottom).text('and it\'s a hit! ');
                    jQuery($textBottom).removeClass('invisible');
                    jQuery($textBottom).addClass('fadeIn');
                    computerTurn();
                }, 2000);

            } else {
                const shipName = computerStatus.shipId;
                jQuery($textBottomRight).text('');
                const sunkText = jQuery($textBottomRight).text(` You sunk their ${shipName}.`);
                sunkText.addClass('invisible');

                if (!computerStatus.allSunk) {
                    setTimeout(() => {
                        jQuery($textTop).text('You fire a shot into enemy waters . . .');
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                        hitCell.addClass('blueToYellow');
                    }, 700);

                    setTimeout(() => {
                        hitCell.attr('id', 'ship');
                        hitCell.removeClass('blueToYellow');
                    }, 1200);
        
                    setTimeout(() => {
                        jQuery($textBottom).text('and it\'s a hit!');
                        jQuery($textBottom).append(sunkText);
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                        markSunkShip(shipName);
                    }, 2000);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                    }, 2500);

                    setTimeout(() => {
                        computerTurn();
                    }, 3500);

                } else {
                    setTimeout(() => {
                        jQuery($textTop).text('You fire a shot into enemy waters . . .');
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                        hitCell.addClass('blueToYellow');
                    }, 700);

                    setTimeout(() => {
                        hitCell.attr('id', 'ship');
                        hitCell.removeClass('blueToYellow');
                    }, 1200);
        
                    setTimeout(() => {
                        jQuery($textBottom).text('and it\'s a hit!');
                        jQuery($textBottom).append(sunkText);
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                        markSunkShip(shipName);
                    }, 2000);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                    }, 2500);

                    setTimeout(() => {
                        jQuery($textTop).addClass('fadeOut');
                        jQuery($textBottom).addClass('fadeOut');
                    }, 3500);

                    setTimeout(() => {
                        jQuery($textTop).addClass('invisible');
                        jQuery($textBottom).addClass('invisible');
                        jQuery($textTop).removeClass('fadeOut');
                        jQuery($textBottom).removeClass('fadeOut');
                    }, 4000);

                    setTimeout(() => {
                        jQuery($textTop).text('');
                        jQuery($textBottom).text('');
                        jQuery($textBottomRight).text('');
                        jQuery($textTop).text(`Congratulations ${playerName},`);
                        jQuery($textBottom).text('you\'re the winner!');
                        jQuery($replayBtn).removeClass('hide');
                        jQuery($replayBtn).addClass('invisible');
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                        jQuery($textBottom).addClass('fadeIn');
                        jQuery($playerBoard).addClass('grow');
                        jQuery($computerBoard).addClass('grow');
                    }, 4100);

                    setTimeout(() => {
                        jQuery($playerBoard).removeClass('grow');
                        jQuery($computerBoard).removeClass('grow');
                    }, 4850);

                    setTimeout(() => {
                        jQuery($replayBtn).removeClass('invisible');
                        jQuery($replayBtn).addClass('fadeIn');
                    }, 5100);

                    setTimeout(() => {
                        jQuery($replayBtn).on('click', resetGame);
                    }, 6100);
                }
            }
        }
    };

    function computerTurn() {
        computerPlayer.gameboard.board.forEach(cell => {
            jQuery($computerBoard[cell.index]).css('cursor', 'default');
            jQuery($computerBoard[cell.index]).off();
        });

        jQuery($textTop).removeClass('fadeIn');
        jQuery($textBottom).removeClass('fadeIn');
        jQuery($textBottomRight).removeClass('fadeIn');

        setTimeout(() => {
            jQuery($textTop).addClass('fadeOut');
            jQuery($textBottom).addClass('fadeOut');
            jQuery($textBottomRight).addClass('fadeOut');
        }, 2000);

        setTimeout(() => {
            jQuery($textTop).addClass('invisible');
            jQuery($textBottom).addClass('invisible');
            jQuery($textBottomRight).addClass('invisible');
        }, 2500);

        setTimeout(() => {
            jQuery($textTop).text('');
            jQuery($textBottom).text('');
            jQuery($textBottomRight).text('');
            jQuery($textTop).text('The enemy is taking aim . . .');
            jQuery($textTop).removeClass('invisible');
            jQuery($textTop).addClass('fadeIn');
        }, 2600);

        setTimeout(() => {
            jQuery($textTop).removeClass('fadeIn');
            jQuery($textTop).addClass('fadeOut');
        }, 3900);

        setTimeout(() => {
            jQuery($textTop).addClass('invisible');
            jQuery($textTop).removeClass('fadeOut');
            jQuery($textTop).text('');
            jQuery($textTop).text('The enemy fires a shot . . .');
        }, 4400);

        if (playerStatus.shipId === 'none') {
            setTimeout(() => {
                jQuery($textTop).removeClass('invisible');
                jQuery($textTop).addClass('fadeIn');
                jQuery($playerBoard[nextComputerMove]).addClass('blueToGreen');
            }, 4500);
            
            setTimeout(() => {
                jQuery($playerBoard[nextComputerMove]).attr('id', 'no-hit');
                jQuery($playerBoard[nextComputerMove]).removeClass('blueToGreen');
            }, 5000);
            
            setTimeout(() => {
                jQuery($textBottom).text('and it\'s a miss.');
                jQuery($textBottom).removeClass('invisible');
                jQuery($textBottom).addClass('fadeIn');

                nextComputerMove = computerMoves.determineMove(playerStatus);
                playerStatus = userPlayer.takeHit(nextComputerMove);

                computerPlayer.gameboard.board.forEach(cell => {
                    if (!jQuery($computerBoard[cell.index]).attr('id')) {
                        jQuery($computerBoard[cell.index]).css('cursor', 'pointer');
        
                        jQuery($computerBoard[cell.index]).on('click', event => {
                            const hitCell = jQuery(event.currentTarget);
                            hitCell.addClass('active');
                            userTurn(hitCell);
                        });
                    }
                });
            }, 6000);

        } else {
            if (!playerStatus.isSunk) {
                setTimeout(() => {
                    jQuery($textTop).removeClass('invisible');
                    jQuery($textTop).addClass('fadeIn');
                    jQuery($playerBoard[nextComputerMove]).addClass('blueToRed');
                }, 4500);

                setTimeout(() => {
                    jQuery($playerBoard[nextComputerMove]).attr('id', 'sunk');
                    jQuery($playerBoard[nextComputerMove]).removeClass('blueToRed');
                }, 5000);

                setTimeout(() => {
                    jQuery($textBottom).text('and it\'s a hit!');
                    jQuery($textBottom).removeClass('invisible');
                    jQuery($textBottom).addClass('fadeIn');
    
                    nextComputerMove = computerMoves.determineMove(playerStatus);
                    playerStatus = userPlayer.takeHit(nextComputerMove);
    
                    computerPlayer.gameboard.board.forEach(cell => {
                        if (!jQuery($computerBoard[cell.index]).attr('id')) {
                            jQuery($computerBoard[cell.index]).css('cursor', 'pointer');
            
                            jQuery($computerBoard[cell.index]).on('click', event => {
                                const hitCell = jQuery(event.currentTarget);
                                hitCell.addClass('active');
                                userTurn(hitCell);
                            });
                        }
                    });
                }, 6000);

            } else {
                const shipName = computerStatus.shipId;
                jQuery($textBottomRight).text('');
                const sunkText = jQuery($textBottomRight).text(` They sunk your ${shipName}.`);
                sunkText.addClass('invisible');

                if (!playerStatus.allSunk) {
                    setTimeout(() => {
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                        jQuery($playerBoard[nextComputerMove]).addClass('blueToRed');
                    }, 4500);
    
                    setTimeout(() => {
                        jQuery($playerBoard[nextComputerMove]).attr('id', 'sunk');
                        jQuery($playerBoard[nextComputerMove]).removeClass('blueToRed');
                    }, 5000);

                    setTimeout(() => {
                        jQuery($textBottom).text('and it\'s a hit!');
                        jQuery($textBottom).append(sunkText);
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                    }, 6000);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                    }, 6500);

                    setTimeout(() => {
                        nextComputerMove = computerMoves.determineMove(playerStatus);
                        playerStatus = userPlayer.takeHit(nextComputerMove);
        
                        computerPlayer.gameboard.board.forEach(cell => {
                            if (!jQuery($computerBoard[cell.index]).attr('id')) {
                                jQuery($computerBoard[cell.index]).css('cursor', 'pointer');
                
                                jQuery($computerBoard[cell.index]).on('click', event => {
                                    const hitCell = jQuery(event.currentTarget);
                                    hitCell.addClass('active');
                                    userTurn(hitCell);
                                });
                            }
                        });
                    }, 7000);

                } else {
                    setTimeout(() => {
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                        jQuery($playerBoard[nextComputerMove]).addClass('blueToRed');
                    }, 4500);

                    setTimeout(() => {
                        jQuery($playerBoard[nextComputerMove]).attr('id', 'sunk');
                        jQuery($playerBoard[nextComputerMove]).removeClass('blueToRed');
                    }, 5000);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                    }, 6500);

                    setTimeout(() => {
                        jQuery($textTop).addClass('fadeOut');
                        jQuery($textBottom).addClass('fadeOut');
                    }, 7500);

                    setTimeout(() => {
                        jQuery($textTop).addClass('invisible');
                        jQuery($textBottom).addClass('invisible');
                        jQuery($textTop).removeClass('fadeOut');
                        jQuery($textBottom).removeClass('fadeOut');
                    }, 8000);

                    setTimeout(() => {
                        jQuery($textTop).text('');
                        jQuery($textBottom).text('');
                        jQuery($textBottomRight).text('');
                        jQuery($textTop).text('The enemy has won.');
                        jQuery($textBottom).text('Better luck next time.');
                        jQuery($replayBtn).removeClass('hide');
                        jQuery($replayBtn).addClass('invisible');
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                        jQuery($textBottom).addClass('fadeIn');
                    }, 8100);

                    setTimeout(() => {
                        jQuery($replayBtn).removeClass('invisible');
                        jQuery($replayBtn).addClass('fadeIn');
                    }, 9100);

                    setTimeout(() => {
                        jQuery($replayBtn).on('click', resetGame);
                    }, 10100);
                }
            }
        }
    };

    function markSunkShip(shipName) {
        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId === shipName) {
                jQuery($computerBoard[cell.index]).removeAttr('id');
                jQuery($computerBoard[cell.index]).addClass('yellowToRed');

                setTimeout(() => {
                    jQuery($computerBoard[cell.index]).attr('id', 'sunk');
                    jQuery($computerBoard[cell.index]).removeClass('yellowToRed');
                }, 500);
            }
        });
    };

    function resetGame() {
        $('.content').addClass('slowFadeOut');

        setTimeout(() => {
            window.location.reload(true);
        }, 2500);
    };
});