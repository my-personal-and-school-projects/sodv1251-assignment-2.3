import { menuItems } from "./menu-items.js";
import { suggestionsFoodCard } from "./templates.js";

//get elements from the DOM
const foodRow = document.querySelector(".row-food");
const drinksRow = document.querySelector(".row-drinks");
const dessertsRow = document.querySelector(".row-desserts");

/**
 * Initialize the page and initial components
 */
function onInit() {
  loadMenuItems();
}

onInit();

/**
 * load and render all available food items for the main menu page
 */
function loadMenuItems() {
  if (foodRow && drinksRow && dessertsRow) {
    foodRow.innerHTML = "";
    drinksRow.innerHTML = "";
    dessertsRow.innerHTML = "";

    //get the food items under the category of foods
    let foods = findAndSortFoodByCategory("foods");
    foods.forEach((foodItem) => {
      foodRow.innerHTML += suggestionsFoodCard(foodItem);
    });

    //get the food items under the category of drinks
    let drinks = findAndSortFoodByCategory("drinks");
    drinks.forEach((drinkItem) => {
      drinksRow.innerHTML += suggestionsFoodCard(drinkItem);
    });

    //get the food items under the category of desserts
    let desserts = findAndSortFoodByCategory("desserts");
    desserts.forEach((dessertItem) => {
      dessertsRow.innerHTML += suggestionsFoodCard(dessertItem);
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
