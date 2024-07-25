const timer = function() {
// Урок 69 - таймер

const deadLine = '2024-08-31';

function getTimeRemaining(endTime) {

    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());  // Date.parse - преобразование даты в числовое выражение (миллисекунды). newDate - текущая дата

    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor((t / (1000 * 60 * 60) % 24)); // Вычисляем количество часов и берем только остаток от деления на 24, так как дни уже вычислены ранее и теперь нужен только остаток часов в рамках одного дня
        minutes = Math.floor((t / 1000 / 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
    }

    return {
        'total': t, // актуальная разница между заявленным дедлайном и текущей датой. Если дедлайн просрочен - становится отрицательной
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZiro(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}


function setClock(selector, endTime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000); // Обновляет таймер на странице 1 раз в секунду

    updateClock(); // сразу обновляем, потому что иначе первое обновление произойдет не после загрузки страницы, а через 1 секунду

    function updateClock() {
        const t = getTimeRemaining(endTime);

        days.innerHTML = getZiro(t.days);
        hours.innerHTML = getZiro(t.hours);
        minutes.innerHTML = getZiro(t.minutes);
        seconds.innerHTML = getZiro(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);   // Если текущая дата больше дедлайна, автообновление таймера останавливается
        }
    }
}

setClock('.timer', deadLine);
}

export default timer;