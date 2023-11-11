function timer(id, deadline) {
    // Timer

    // const deadline
    // 1 функция, которая будет устанавливать разницу getTimeRemaining
    // 2 функция, которая будет устанавливать таймер на страницу setTime
    // 3 функция, которая будет заниматься обновлением таймера updateClock

    function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date());

    if(t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((t / (1000 * 60)) % 60);
        seconds = Math.floor((t / 1000) % 60);
    }

    return {
        total: t,
        days,
        hours,
        minutes,
        seconds
    };
    }

    function zero(num) {
    if(num > 0 && num <= 10) {
        return '0' + num;
    } else {
        return num;
    }
    }

    function setTime(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        console.log('Обновление таймера...');

        const t = getTimeRemaining(endtime);

        days.innerHTML = zero(t.days);
        hours.innerHTML = zero(t.hours);
        minutes.innerHTML = zero(t.minutes);
        seconds.innerHTML = zero(t.seconds);

        if(t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
    }

    setTime(id, deadline);
}

export default timer;