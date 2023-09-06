document.getElementById('setAlarm').onclick= setAlarm;
document.getElementById('alarmTimer').innerHTML='00:00:00';
document.getElementById('playAlarm').onclick= playPauseAlarm;

let alarmInMiliSec=0,
    restingTime=0,
    idInterval= null,
    isAlarmInit=false,
    alarmInDate=null;

const restartSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>',
    playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>',
    pauseSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>',
    stopAlarmSVG= '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path d="M5.164 14H15c-1.5-1-2-5.902-2-7 0-.264-.02-.523-.06-.776L5.164 14zm6.288-10.617A4.988 4.988 0 0 0 8.995 2.1a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 7c0 .898-.335 4.342-1.278 6.113l9.73-9.73zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z"/></svg>';

 document.getElementById('playAlarm').innerHTML=playSVG;


function  setAlarm (){
    let hours=document.getElementById('alarmHours').value,
     min=document.getElementById('alarmMin').value,
     sec=document.getElementById('alarmSec').value;

     //controlamos que no este sonando la alarma
     if (!sound.paused){
        sound.pause();
        sound.currentTime = 0; // Restablecer el tiempo de reproducción a cero
        document.getElementById('playAlarm').innerHTML=playSVG;
    }  

    //convertimos a milisegundos
    alarmInMiliSec = (sec * 1000) + (min * 60 * 1000) + (hours * 3600 * 1000);
    
    isAlarmInit=false;
    restingTime=0;
    alarmInDate=null;

    //limpiamos el interval
    clearInterval(idInterval);

    //mostramos play y mostramos en el reloj la alarma
    document.getElementById('playAlarm').innerHTML=playSVG;
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



function playPauseAlarm (){
    if (!isAlarmInit){
        if (!sound.paused){
            sound.pause();
            sound.currentTime = 0; // Restablecer el tiempo de reproducción a cero
            document.getElementById('playAlarm').innerHTML=restartSVG;
        }  
            
        else{
        document.getElementById('playAlarm').innerHTML=pauseSVG;
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
                document.getElementById('playAlarm').innerHTML=stopAlarmSVG; //Cambia el botón para detener el sonido
            } else {
                document.getElementById('alarmTimer').innerHTML = MiliSecToHourMinSec(restingTime);
            }
        }, 500);

        isAlarmInit = true; // El temporizador está en ejecución
    }}
    else{
        document.getElementById('playAlarm').innerHTML=playSVG;
        clearInterval(idInterval);
        isAlarmInit = false; // El temporizador está en pausa
    }
}


