import gameplay from './modules/gameplay';
import '../dist/style.css';
import 'jquery';

jQuery(function() {

    $(window).on('load', () => {
        $('.new-game').removeClass('hide');
        $('.new-game').addClass('move-up');
        setTimeout(() => {
            $('.new-game').removeClass('move-up');
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
            console.log('success')
        }, 1000);
    });
});