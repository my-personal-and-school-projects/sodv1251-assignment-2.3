import { menuItems } from "./menu-items.js";
import { suggestionsFoodCard } from "./templates.js";

//get necessary components from teh DOM
const carouselContainer = document.querySelector(".carousel-container");
const foodRow = document.querySelector(".row-food");

function onInit() {
  loadHTMLLayoutComponents(
    "./components/carousel.html",
    ".carousel-container"
  ).then(() => {
    displayBannerFoodItemInfo();
  });
  loadMenuItems();
}

onInit();

/**
 * load necessary shared layout for the pages
 */
async function loadHTMLLayoutComponents(component, container) {
  return fetch(component)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(container).innerHTML = data;
    })
    .catch((error) =>
      console.error(`Error loading component: ${component}`, error)
    );
}

/**
 * load and render food items for the food-menu page
 */
function loadMenuItems() {
  if (foodRow) {
    foodRow.innerHTML = "";

    //get the food items under the category of foods
    let foods = findAndSortFoodByCategory("foods");
    foods.forEach((foodItem) => {
      foodRow.innerHTML += suggestionsFoodCard(foodItem);
    });
  }
}

/**
 * Create an a list of sorted items by catgory
 * @param {*} category
 * @returns
 */
function findAndSortFoodByCategory(category) {
  let foodItems = menuItems.filter((item) => item.category === category);
  const assortedFood = foodItems.sort((a, b) => a.name.localeCompare(b.name));

  return assortedFood;
}

function displayBannerFoodItemInfo() {
  getBannerFoodItemsData(26, ".item-1 h5", ".item-1 span");
  getBannerFoodItemsData(27, ".item-2 h5", ".item-2 span");
  getBannerFoodItemsData(28, ".item-3 h5", ".item-3 span");
}

function getBannerFoodItemsData(id, component1, component2) {
  let foodItem = menuItems.find((item) => item.id === id);

  document.querySelector(component1).textContent = foodItem.name;
  document.querySelector(component2).textContent = foodItem.price;
}
