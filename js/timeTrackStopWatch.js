document.getElementById('playStopWatch').onclick = playStopWatch;
document.getElementById('pauseStopWatch').onclick = pauseStopWatch;
document.getElementById('stopStopWatch').onclick = stopStopWatch;

let timeDifference = 0,
    watchIdInterval = null,
    startingTime = null,
    watchHours = '00',
    watchMins = '00',
    watchSecs = '00';


function playStopWatch() {
    startingTime = new Date(new Date().getTime() - timeDifference);
    clearInterval(watchIdInterval);
    watchIdInterval = setInterval(refreshTimer, 1000);
}

function pauseStopWatch() {
    clearInterval(watchIdInterval);
    timeDifference = new Date().getTime() - startingTime.getTime();
}

function stopStopWatch() {
    clearInterval(watchIdInterval);
    timeDifference = 0;
    watchHours = '00';
    watchMins = '00';
    watchSecs = '00';
    document.getElementById('watchHours').innerHTML = watchHours;
    document.getElementById('watchMins').innerHTML = watchMins;
    document.getElementById('watchSecs').innerHTML = watchSecs;
}

function refreshTimer() {
    const diferencia = new Date().getTime() - startingTime.getTime();
    convertMiliSecs(diferencia);
    document.getElementById('watchHours').innerHTML = watchHours;
    document.getElementById('watchMins').innerHTML = watchMins;
    document.getElementById('watchSecs').innerHTML = watchSecs;
}

function convertMiliSecs(TotalMiliSec) {
    watchHours = String(Math.floor(TotalMiliSec / (1000 * 60 * 60))).padStart(2, '0'); // Calcula las horas
            TotalMiliSec -= watchHours * 60 * 60 * 1000; // Resta las horas al total

            watchMins = String(Math.floor(TotalMiliSec / (1000 * 60))).padStart(2, '0'); // Calcula los minutos
            TotalMiliSec -= watchMins * 60 * 1000; // Resta los minutos al total

            watchSecs = String(Math.floor(TotalMiliSec / 1000)).padStart(2, '0'); // Calcula los segundos
}
