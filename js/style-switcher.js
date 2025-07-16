/* ====================================== toggle style switcher ========================*/
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style switcher on scroll 
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }    
})
/* ====================================== theme colors ========================*/
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color)
{
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute("title"))
        {
            style.removeAttribute("disabled");
        }    
        else
        {
            style.setAttribute("disabled" , "true"); 
        }
    })
}
/* ====================================== theme ligth and dark mode  ========================*/
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark") ;
})
window.addEventListener("load" , () => {
    if(document.body.classList.contains("dark"))
    {
        dayNight.querySelector("i").classList.add("fa-sun");
    } 
    else
    {
        dayNight.querySelector("i").classList.add("fa-moon");
    }   
})
const homeHeroImg = document.getElementById('home-hero-img');
if (homeHeroImg) {
  function updateHomeHeroImg() {
    if (document.body.classList.contains('dark')) {
      homeHeroImg.src = 'images/hero 1.jpg';
    } else {
      homeHeroImg.src = 'images/hero 2.jpg';
    }
  }
  // Update on theme toggle
  dayNight.addEventListener('click', updateHomeHeroImg);
  // Update on page load
  window.addEventListener('load', updateHomeHeroImg);
}

// Logo switching functionality
const mainLogo = document.getElementById('main-logo');
if (mainLogo) {
  function updateMainLogo() {
    if (document.body.classList.contains('dark')) {
      mainLogo.src = 'images/logo 2.png';
    } else {
      mainLogo.src = 'images/logo 1.png';
    }
  }
  // Update on theme toggle
  dayNight.addEventListener('click', updateMainLogo);
  // Update on page load
  window.addEventListener('load', updateMainLogo);
}