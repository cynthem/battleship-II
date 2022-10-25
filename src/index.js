import 'jquery';

$(function() {

    $('.player-board').children().on('click', event => {
        $(event.currentTarget).css('backgroundColor', '#ff787a');
    });
});