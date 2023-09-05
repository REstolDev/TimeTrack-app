document.getElementById('setAlarm').onclick= setAlarm;
document.getElementById('alarmTimer').innerHTML='00:00:00';
document.getElementById('playAlarm').onclick= playAlarm;

let alarmInMiliSec=0;
let alarmInDate=null;
let idInterval= null;
let isAlarmInit=false;


function  setAlarm (){
    let hours=document.getElementById('alarmHours').value,
     min=document.getElementById('alarmMin').value,
     sec=document.getElementById('alarmSec').value;

    if (hours>23) hours=23;
    else if (hours<=0) hours=0;

    if (min>59) min=59;
    else if (min<=0) min=0;

    if (sec>59) sec=59;
    else if (sec<=0) sec=0;

    alarmInMiliSec = (sec * 1000) + (min * 60 * 1000) + (hours * 3600 * 1000);
    clearInterval(idInterval);
    document.getElementById('alarmTimer').innerHTML= `${addZeroIfNecessary(hours)}:${addZeroIfNecessary(min)}:${addZeroIfNecessary(sec)}`;
}

const addZeroIfNecessary = (valor) => {
    if (valor < 10 ) {
        return "0" + valor;
    } 
    else {
        return "" + valor;
    }

}

function playAlarm (){
    if (!isAlarmInit){
        // Configurar la fecha de inicio si es la primera vez que se inicia
        if (!alarmInDate) alarmInDate = new Date(new Date().getTime() + alarmInMiliSec);
       
        clearInterval(idInterval);
       
        idInterval = setInterval(() => {
            
            const restingTime = alarmInDate.getTime() - new Date().getTime();
           
            if (restingTime <= 0) {
                clearInterval(idInterval);
                alarmInDate = null; // Restablecer la fecha de inicio
                isAlarmInit = false; //Restablece la Posicion inicial
            } else {
                document.getElementById('alarmTimer').innerHTML = MiliSecToHourMinSec(restingTime);
            }
        }, 50);

        isAlarmInit = true; // El temporizador está en ejecución
    }
    else{
        clearInterval(idInterval);
        isAlarmInit = false; // El temporizador está en pausa
    }
}


const MiliSecToHourMinSec = (TotalMiliSec) => {
    let hour = parseInt(TotalMiliSec / (1000 * 60 * 60)); // Calcula las horas
    TotalMiliSec -= hour * 60 * 60 * 1000; // Resta las horas al total

    let min = parseInt(TotalMiliSec / (1000 * 60)); // Calcula los minutos
    TotalMiliSec -= min * 60 * 1000; // Resta los minutos al total

    let sec = TotalMiliSec / 1000; // Calcula los segundos
    
    
    return `${addZeroIfNecessary(hour)}:${addZeroIfNecessary(min)}:${addZeroIfNecessary(sec.toFixed(0))}`;
}

