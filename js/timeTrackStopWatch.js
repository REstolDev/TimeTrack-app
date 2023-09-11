let timeDifference = 0,
  watchIdInterval = null,
  startingTime = null,
  watchHours = "00",
  watchMins = "00",
  watchSecs = "00",
  isPaused = false;

const playStopWatch = () => {
  const now = new Date();
  if (!startingTime || isPaused) {
    isPaused = false;
    startingTime = new Date(now.getTime() - timeDifference);
    clearInterval(watchIdInterval);
    watchIdInterval = setInterval(refreshTimer, 1000);
  }
};

const pauseStopWatch = () => {

  if(startingTime && !isPaused){
   clearInterval(watchIdInterval);
   timeDifference = new Date().getTime() - startingTime.getTime();
   isPaused = true;
  };
};

// Detenemos el cronómetro y reiniciamos las variables
const stopStopWatch = () => {
  if(startingTime){
    console.log(timeDifference);
    
    pauseStopWatch();
    console.log(timeDifference);

     // Preguntar al usuario si desea guardar el proyecto
     customConfirm("Do you want to save this project in your Locale Storage?", (isConfirmed) => {
      if(isConfirmed) add();
      console.log(timeDifference);

      clearInterval(watchIdInterval);
      timeDifference = 0;
      watchHours = "00";
      watchMins = "00";
      watchSecs = "00";
      isPaused = false;
      startingTime = null;
      showTimer(watchHours, watchMins, watchSecs);
      console.log(timeDifference);

     });

  };
};

// Actualizamos el cronómetro mostrando la hora, los minutos y los segundos
const refreshTimer = () => {
  const diferencia = new Date().getTime() - startingTime.getTime();
  convertMiliSecs(diferencia);
  showTimer(watchHours, watchMins, watchSecs);
};

//Mostramos la hora, los minutos y los segundos
const showTimer = (hours, mins, secs) => {
  document.getElementById("watchHours").innerHTML = hours;
  document.getElementById("watchMins").innerHTML = mins;
  document.getElementById("watchSecs").innerHTML = secs;
};

//Conversion de milisegundos a horas,minutos y segundos y añade un cero si es necesario

const convertMiliSecs = (TotalMiliSec) => {
  watchHours = String(Math.floor(TotalMiliSec / (1000 * 60 * 60))).padStart(
    2,
    "0"
  ); // Calcula las horas y añade un cero si es necesario
  TotalMiliSec -= watchHours * 60 * 60 * 1000; // Resta las horas al total

  watchMins = String(Math.floor(TotalMiliSec / (1000 * 60))).padStart(2, "0"); // Calcula los minutos y añade un cero si es necesario
  TotalMiliSec -= watchMins * 60 * 1000; // Resta los minutos al total

  watchSecs = String(Math.floor(TotalMiliSec / 1000)).padStart(2, "0"); // Calcula los segundos y añade un cero si es necesario
};
/* Math.floor(): redondear hacia abajo el resultado.

 String(...): convertimos el resultado en un string ,necesario para usar el método padStart.

 .padStart(2, '0'): la cadena tenga al menos dos caracteres. Si tiene menos de dos caracteres, se rellena con ceros a la izquierda.
*/
document.getElementById("playStopWatch").onclick = playStopWatch;
document.getElementById("pauseStopWatch").onclick = pauseStopWatch;
document.getElementById("stopStopWatch").onclick = stopStopWatch;
