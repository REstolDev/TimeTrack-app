document.getElementById('setAlarm').onclick= setAlarm;
document.getElementById('alarmTimer').innerHTML='00:00:00';
document.getElementById('playAlarm').onclick= playPauseAlarm;

let alarmInMiliSec=0,
    restingTime=0,
    idInterval= null,
    isAlarmInit=false,
    alarmInDate=null;

document.getElementById('playAlarm').innerHTML=">";


function  setAlarm (){
    let hours=document.getElementById('alarmHours').value,
     min=document.getElementById('alarmMin').value,
     sec=document.getElementById('alarmSec').value;

     //controlamos que no este sonando la alarma
     if (!sound.paused){
        sound.pause();
        sound.currentTime = 0; // Restablecer el tiempo de reproducción a cero
        document.getElementById('playAlarm').innerHTML=">";
    }  

    //convertimos a milisegundos
    alarmInMiliSec = (sec * 1000) + (min * 60 * 1000) + (hours * 3600 * 1000);
    
    //limpiamos el interval
    clearInterval(idInterval);

    //mostramos play y mostramos en el reloj la alarma
    document.getElementById('playAlarm').innerHTML=">";
    document.getElementById('alarmTimer').innerHTML= `${addZeroIfNecessary(hours)}:${addZeroIfNecessary(min)}:${addZeroIfNecessary(sec)}`;
}

function limitTwoIntegers(input) {
    var valor = input.value;

    // Eliminar caracteres no numéricos
    valor = valor.replace(/\D/g, '');

    // Limitar a dos dígitos enteros
    if (valor.length > 2) valor = valor.slice(0, 2);

    //convertimos a entero
    valor=parseInt(valor);

    //controlamos que no sea mayor de 59 y que no sea NaN
    if (valor>59) valor=59;
    else if (valor<=0 || isNaN(valor)) valor=0;

    // Actualizar el valor del campo
    input.value = valor;

}


const addZeroIfNecessary = (valor) => {
    if (valor < 10 ) return "0" + valor;
    else return valor;
}

function playPauseAlarm (){
    if (!isAlarmInit){
        if (!sound.paused){
            sound.pause();
            sound.currentTime = 0; // Restablecer el tiempo de reproducción a cero
            document.getElementById('playAlarm').innerHTML="@";
        }  
            
        else{
        document.getElementById('playAlarm').innerHTML="||";
        // Configurar la fecha de inicio si es la primera vez que se inicia
        if (!alarmInDate) alarmInDate = new Date(new Date().getTime() + alarmInMiliSec);
        else alarmInDate = new Date(new Date().getTime() + restingTime);
       
        clearInterval(idInterval);
       
        idInterval = setInterval(() => {
            
            restingTime = alarmInDate.getTime() - new Date().getTime();
           
            if (restingTime <= 0) {
                clearInterval(idInterval);
                sound.play(); 
                alarmInDate = null; // Restablecer la fecha de inicio
                isAlarmInit = false; //Restablece la Posicion inicial
                document.getElementById('playAlarm').innerHTML="!!"; //Cambia el botón para detener el sonido
            } else {
                document.getElementById('alarmTimer').innerHTML = MiliSecToHourMinSec(restingTime);
            }
        }, 50);

        isAlarmInit = true; // El temporizador está en ejecución
    }}
    else{
        document.getElementById('playAlarm').innerHTML=">";
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

// Carga un sound a través de su fuente y lo inyecta de manera oculta
	// Tomado de: https://parzibyte.me/blog/2020/09/28/reproducir-sonidos-javascript/
const chargeSound = function (fuente) {
	const sound = document.createElement("audio");
	sound.src = fuente;
	sound.loop = true;
	sound.setAttribute("preload", "auto");
	sound.setAttribute("controls", "none");
	sound.style.display = "none"; // <-- oculto
	document.body.appendChild(sound);
	return sound;
};
const sound = chargeSound("src/atrapado_en_el_tiempo_el_dia_de_la_marmota.mp3");