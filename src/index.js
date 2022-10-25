import gameplay from './modules/gameplay';
import '../dist/style.css';
import 'jquery';

jQuery(function() {

    $('.new-game-form').on('submit', event => {
        event.preventDefault();
        const $inputName = $('.new-game-input').val();
        console.log($inputName)
    });
});