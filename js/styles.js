
document.getElementById('darkLightMode').onclick=darkLightMode;
document.getElementById('fullScreenWatch').onclick=fullScreenWatch;
document.getElementById('deactivateFullScreenBtn').onclick = removeHide;



let darkModeActivated = false;
let fullScreenActivated = false;

function darkLightMode(){
// Accede a las variables CSS y modifica los estilos
    const root = document.documentElement;
    // Intecambio  del valor de los colores
    if (!darkModeActivated){
        root.style.setProperty('--blanco', '#393939');
        root.style.setProperty('--negro', '#f6f2ef');
    }
    else{
        root.style.setProperty('--blanco', '#f6f2ef');
        root.style.setProperty('--negro', '#393939');
    }

    darkModeActivated = !darkModeActivated;
}

const divToHide = document.querySelectorAll(".divToHide");

function fullScreenWatch(){
  console.log(fullScreenActivated);

    divToHide.forEach((v, i) => divToHide[i].classList.add("hide"));
    fullScreenActivated=true;
    console.log(fullScreenActivated);

}


function removeHide(){
  console.log('removeHide');

    divToHide.forEach((v, i) => divToHide[i].classList.remove("hide"));
}


//mostrar y ocultar secciones
const btnMenu = document.querySelectorAll(".btnMenu");
const section = document.querySelectorAll(".section");

btnMenu.forEach((v, i) => {
  btnMenu[i].addEventListener("click", () => {
    if (btnMenu[i].classList.value == "navbar__btn btnMenu active"){
        btnMenu[i].classList.remove("active");
        section[i].classList.remove("active");
    }
    else {
      btnMenu.forEach((v, i) => btnMenu[i].classList.remove("active"));
      btnMenu[i].classList.add("active");
      section.forEach((v, i) => section[i].classList.remove("active"));
      section[i].classList.add("active");
    }
  });
});