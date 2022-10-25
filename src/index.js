import gameplay from './modules/gameplay';
import '../dist/style.css';
import 'jquery';

jQuery(function() {

    $(window).on('load', () => {
        $('.new-game').animate({
            'transform': 'translateY(0%)'
        }, 1000);
    })

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