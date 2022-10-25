

/*

        const beginGame = function(userName, computerName, $) {
            
    
            computerPlayer.gameboard.board.forEach(cell => {
                if (cell.shipId !== 'none') {
                    $computerBoard[cell.index].addClass('computer-ship');
                }
            });
    
            $computerBoard.forEach(cell => {
                cell.style.cursor = 'pointer';
                cell.on('click', event => {
                    $(event.currentTarget).addClass('active');
                    userTurn(event);
                });
            });
        }
    
        function userTurn(event) {
            $(event.currentTarget).removeClass('active');
            $textTop.text('');
            $textBottom.text('');
    
        };
    
        
        beginGame();
})(jQuery);*/