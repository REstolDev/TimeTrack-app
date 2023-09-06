// Carga un sonido y lo inyecta de manera oculta
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

//Añade un cero si es necesario
const addZeroIfNecessary = (valor) => {
    if (valor < 10 ) return "0" + valor;
    else return valor;
}

//Conversion de milisegundos a horas,minutos y segundos
const MiliSecToHourMinSec = (TotalMiliSec) => {
    let hour = parseInt(TotalMiliSec / (1000 * 60 * 60)); // Calcula las horas
    TotalMiliSec -= hour * 60 * 60 * 1000; // Resta las horas al total

    let min = parseInt(TotalMiliSec / (1000 * 60)); // Calcula los minutos
    TotalMiliSec -= min * 60 * 1000; // Resta los minutos al total

    let sec = TotalMiliSec / 1000; // Calcula los segundos
    
    
    return `${addZeroIfNecessary(hour)}:${addZeroIfNecessary(min)}:${addZeroIfNecessary(sec.toFixed(0))}`;
}