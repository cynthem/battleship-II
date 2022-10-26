import Player from "./factories/Player";
import ComputerMove from "./factories/ComputerMove";
import './index.css';
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
        }, 1500); 
    });

    $('.new-game-form').on('submit', event => {
        event.preventDefault();
        const $inputName = $('.new-game-input').val();

        $('.new-game-form').addClass('fadeOut');
        $('.new-game-msg').addClass('fadeOut');
        $('.player-name').text($inputName);

        setTimeout(() => {
            $('.player-name').removeClass('invisible');
            $('.computer-name').removeClass('invisible');
            $('.player-name').addClass('fadeIn');
            $('.computer-name').addClass('fadeIn');
            $('.new-game').addClass('hide');
            $('.gameplay-text').removeClass('hide');
        }, 500);
        
        setTimeout(() => {
            beginGame($inputName, 'computer');
        }, 2000);

        setTimeout(() => {
            $textTop.fadeIn(1000);
        }, 3000);
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
                    jQuery($playerBoard[cell.index]).removeClass('blueToYellow');
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
        jQuery($textTop).removeClass('fadeIn');
        jQuery($textBottom).removeClass('fadeIn');
        jQuery($textBottomRight).removeClass('fadeIn');

        setTimeout(() => {
            hitCell.removeClass('active');
            jQuery($textTop).addClass('fadeOut');
            jQuery($textBottom).addClass('fadeOut');
            jQuery($textBottomRight).addClass('fadeOut');
        }, 100);
        
        setTimeout(() => {
            jQuery($textTop).addClass('invisible');
            jQuery($textBottom).addClass('invisible');
            jQuery($textBottomRight).addClass('invisible');
        }, 600);

        setTimeout(() => {
            jQuery($textTop).text('You fire a shot into enemy waters . . .');
            jQuery($textTop).removeClass('fadeOut');
            jQuery($textBottom).removeClass('fadeOut');
        }, 700);

        setTimeout(() => {
            jQuery($textTop).removeClass('invisible');
            jQuery($textTop).addClass('fadeIn');
        }, 800);

        const hitCellClass = hitCell.attr('class');
        const stringIndex = hitCellClass.slice(9, 11);
        const hitIndex = Number(stringIndex);
        
        computerStatus = computerPlayer.takeHit(hitIndex);

        if (computerStatus.shipId === 'none') {
            setTimeout(() => {
                hitCell.addClass('blueToGreen');
            }, 1500);

            setTimeout(() => {
                hitCell.attr('id', 'no-hit');
                hitCell.removeClass('blueToGreen');
                jQuery($textBottom).text('and it\'s a miss.');
            }, 2000);

            setTimeout(() => {
                jQuery($textBottom).removeClass('invisible');
                jQuery($textBottom).addClass('fadeIn');
            }, 2200);

            setTimeout(() => {
                computerTurn();
            }, 3200);
            
        } else {
            if (!computerStatus.isSunk) {
                setTimeout(() => {
                    hitCell.addClass('blueToYellow');
                }, 1500);
    
                setTimeout(() => {
                    hitCell.attr('id', 'ship');
                    hitCell.removeClass('blueToYellow');
                    jQuery($textBottom).text('and it\'s a hit!');
                }, 2000);
    
                setTimeout(() => {
                    jQuery($textBottom).removeClass('invisible');
                    jQuery($textBottom).addClass('fadeIn');
                }, 2200);
    
                setTimeout(() => {
                    computerTurn();
                }, 3200);

            } else {
                const shipName = computerStatus.shipId;
                jQuery($textBottomRight).text('');
                const sunkText = jQuery($textBottomRight).text(` You sunk their ${shipName}.`);
                sunkText.addClass('invisible');

                if (!computerStatus.allSunk) {
                    setTimeout(() => {
                        hitCell.addClass('blueToYellow');
                    }, 1500);
        
                    setTimeout(() => {
                        hitCell.attr('id', 'ship');
                        hitCell.removeClass('blueToYellow');
                        jQuery($textBottom).text('and it\'s a hit!');
                        jQuery($textBottom).append(sunkText);
                    }, 2000);
        
                    setTimeout(() => {
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                    }, 2200);

                    setTimeout(() => {
                        markSunkShip(shipName);
                    }, 2500);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                    }, 3000);

                    setTimeout(() => {
                        computerTurn();
                    }, 4000);

                } else {
                    setTimeout(() => {
                        hitCell.addClass('blueToYellow');
                    }, 1500);
        
                    setTimeout(() => {
                        hitCell.attr('id', 'ship');
                        hitCell.removeClass('blueToYellow');
                        jQuery($textBottom).text('and it\'s a hit!');
                        jQuery($textBottom).append(sunkText);
                    }, 2000);
        
                    setTimeout(() => {
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                    }, 2200);

                    setTimeout(() => {
                        markSunkShip(shipName);
                    }, 2500);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                    }, 3000);

                    setTimeout(() => {
                        jQuery($textTop).addClass('fadeOut');
                        jQuery($textBottom).addClass('fadeOut');
                    }, 5000);

                    setTimeout(() => {
                        jQuery($textTop).addClass('invisible');
                        jQuery($textBottom).addClass('invisible');
                        jQuery($textTop).removeClass('fadeOut');
                        jQuery($textBottom).removeClass('fadeOut');
                    }, 5500);

                    setTimeout(() => {
                        jQuery($textBottomRight).text('');
                        jQuery($textBottom).text('');
                        jQuery($textTop).text(`Congratulations ${playerName}, you win!`);
                        jQuery($replayBtn).removeClass('hide');
                        jQuery($replayBtn).addClass('invisible');
                    }, 5600);

                    setTimeout(() => {
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                    }, 5700);

                    setTimeout(() => {
                        jQuery($playerBoard).addClass('grow');
                        jQuery($computerBoard).addClass('grow');
                    }, 6700);

                    setTimeout(() => {
                        jQuery($replayBtn).removeClass('invisible');
                        jQuery($replayBtn).addClass('fadeIn');
                    }, 7200);

                    setTimeout(() => {
                        jQuery($replayBtn).on('click', resetGame);
                    }, 8200);
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
            jQuery($textTop).removeClass('fadeOut');
            jQuery($textBottom).removeClass('fadeOut');
            jQuery($textBottomRight).removeClass('fadeOut');
        }, 2500);

        setTimeout(() => {
            jQuery($textTop).text('The enemy is taking aim . . .');
            jQuery($textTop).removeClass('invisible');
            jQuery($textTop).addClass('fadeIn');
        }, 2600);

        setTimeout(() => {
            jQuery($textTop).removeClass('fadeIn');
            jQuery($textTop).addClass('fadeOut');
        }, 4400);

        setTimeout(() => {
            jQuery($textTop).addClass('invisible');
            jQuery($textTop).removeClass('fadeOut');
        }, 4900);

        setTimeout(() => {
            jQuery($textTop).text('The enemy fires a shot . . .');
            jQuery($textTop).removeClass('invisible');
            jQuery($textTop).addClass('fadeIn');
        }, 5000);

        if (playerStatus.shipId === 'none') {
            setTimeout(() => {
                jQuery($playerBoard[nextComputerMove]).addClass('blueToGreen');
            }, 5500);
            
            setTimeout(() => {
                jQuery($playerBoard[nextComputerMove]).attr('id', 'no-hit');
                jQuery($playerBoard[nextComputerMove]).removeClass('blueToGreen');
                jQuery($textBottom).text('and it\'s a miss.');
            }, 6000);
            
            setTimeout(() => {
                jQuery($textBottom).removeClass('invisible');
                jQuery($textBottom).addClass('fadeIn');
                nextComputerMove = computerMoves.determineMove(playerStatus);
                playerStatus = userPlayer.takeHit(nextComputerMove);
            }, 6200);

            setTimeout(() => {
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
            }, 7200);

        } else {
            if (!playerStatus.isSunk) {
                setTimeout(() => {
                    jQuery($playerBoard[nextComputerMove]).addClass('yellowToRed');
                }, 5500);

                setTimeout(() => {
                    jQuery($playerBoard[nextComputerMove]).attr('id', 'sunk');
                    jQuery($playerBoard[nextComputerMove]).removeClass('yellowToRed');
                    jQuery($textBottom).text('and it\'s a hit!');
                }, 6000);

                setTimeout(() => {
                    jQuery($textBottom).removeClass('invisible');
                    jQuery($textBottom).addClass('fadeIn');
                    nextComputerMove = computerMoves.determineMove(playerStatus);
                    playerStatus = userPlayer.takeHit(nextComputerMove);
                }, 6200);

                setTimeout(() => {
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
                }, 7200);

            } else {
                const shipName = computerStatus.shipId;
                jQuery($textBottomRight).text('');
                const sunkText = jQuery($textBottomRight).text(` They sunk your ${shipName}.`);
                sunkText.addClass('invisible');

                if (!playerStatus.allSunk) {
                    setTimeout(() => {
                        jQuery($playerBoard[nextComputerMove]).addClass('yellowToRed');
                    }, 5500);
    
                    setTimeout(() => {
                        jQuery($playerBoard[nextComputerMove]).attr('id', 'sunk');
                        jQuery($playerBoard[nextComputerMove]).removeClass('yellowToRed');
                        jQuery($textBottom).text('and it\'s a hit!');
                        jQuery($textBottom).append(sunkText);
                    }, 6000);

                    setTimeout(() => {
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                    }, 6200);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                        nextComputerMove = computerMoves.determineMove(playerStatus);
                        playerStatus = userPlayer.takeHit(nextComputerMove);
                    }, 6700);

                    setTimeout(() => {
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
                    }, 7700);

                } else {
                    setTimeout(() => {
                        jQuery($playerBoard[nextComputerMove]).addClass('yellowToRed');
                    }, 5500);
    
                    setTimeout(() => {
                        jQuery($playerBoard[nextComputerMove]).attr('id', 'sunk');
                        jQuery($playerBoard[nextComputerMove]).removeClass('yellowToRed');
                        jQuery($textBottom).text('and it\'s a hit!');
                        jQuery($textBottom).append(sunkText);
                    }, 6000);

                    setTimeout(() => {
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                    }, 6200);

                    setTimeout(() => {
                        sunkText.removeClass('invisible');
                        sunkText.addClass('fadeIn');
                    }, 6700);

                    setTimeout(() => {
                        jQuery($textTop).addClass('fadeOut');
                        jQuery($textBottom).addClass('fadeOut');
                    }, 8500);

                    setTimeout(() => {
                        jQuery($textTop).addClass('invisible');
                        jQuery($textBottom).addClass('invisible');
                        jQuery($textTop).removeClass('fadeOut');
                        jQuery($textBottom).removeClass('fadeOut');
                    }, 9000);

                    setTimeout(() => {
                        jQuery($textBottomRight).text('');
                        jQuery($textTop).text('The enemy has won.');
                        jQuery($textBottom).text('Better luck next time.');
                        jQuery($replayBtn).removeClass('hide');
                        jQuery($replayBtn).addClass('invisible');
                    }, 9100);

                    setTimeout(() => {
                        jQuery($textTop).removeClass('invisible');
                        jQuery($textTop).addClass('fadeIn');
                    }, 9200);

                    setTimeout(() => {
                        jQuery($textBottom).removeClass('invisible');
                        jQuery($textBottom).addClass('fadeIn');
                    }, 9700);

                    setTimeout(() => {
                        jQuery($replayBtn).removeClass('invisible');
                        jQuery($replayBtn).addClass('fadeIn');
                    }, 10700);

                    setTimeout(() => {
                        jQuery($replayBtn).on('click', resetGame);
                    }, 11700);
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