window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          calc = require('./modules/calc'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          timer = require('./modules/timer'),
          cards = require('./modules/cards');

    tabs();
    calc();
    forms();
    modal();
    slider();
    timer();
    cards();
});

