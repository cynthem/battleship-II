import '../dist/style.css';
import 'jquery';

jQuery(function() {

    $('.player-0').on('click', () => {
        $('.player-0').attr('id', 'hit');
    })
});