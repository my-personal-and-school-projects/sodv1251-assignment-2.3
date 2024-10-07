//get necessary components from teh DOM
const carouselContainer = document.querySelector(".carousel-container");

function onInit() {
  loadHTMLLayoutComponents("./components/carousel.html", ".carousel-container");
}

onInit();

/**
 * load necessary shared layout for the pages
 */
function loadHTMLLayoutComponents(component, container) {
  fetch(component)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(container).innerHTML = data;
    })
    .catch((error) =>
      console.error(`Error loading component: ${component}`, error)
    );
}

const myCarouselElement = document.querySelector("#myCarousel");

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false,
});
