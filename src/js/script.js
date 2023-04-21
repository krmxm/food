import tabs from './modules/tabs';
import calc from './modules/calc';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import cards from './modules/cards';

window.addEventListener('DOMContentLoaded', () => {
         

    tabs();
    calc();
    forms();
    modal('[data-modal]', '.modal');
    slider();
    timer();
    cards();
});

