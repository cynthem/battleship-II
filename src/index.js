import gameplay from './modules/gameplay';
import '../dist/style.css';
import 'jquery';

jQuery(function() {

    $(window).on('load', () => {
        $('.player-board').addClass('grow');
        $('.computer-board').addClass('grow');
        $('.new-game').removeClass('hide');
        $('.new-game').addClass('move-up');
        setTimeout(() => {
            $('.new-game').removeClass('move-up');
            $('.player-board').removeClass('grow');
            $('.computer-board').removeClass('grow');
        }, 1001);
    });

    $('.new-game-form').on('submit', event => {
        event.preventDefault();
        const $inputName = $('.new-game-input').val();
        $('.player-name').text($inputName);
        $('.player-name').removeClass('invisible');
        $('.computer-name').removeClass('invisible');
        $('.new-game').addClass('hide');
        $('.gameplay-text').removeClass('hide');
        setTimeout(() => {
            //gameplay.beginGame($inputName, 'computer');
        }, 1000);
    });
});