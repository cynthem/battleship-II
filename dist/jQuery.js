jQuery(function() {
    $('.content').on('load', () => {
        $('.new-game').slideDown(1000);
    });

    $('.player-board').children().on('click', event => {
        $(event.currentTarget).css('color', '#ff787a');
    });
});