import { menuItems } from "./menu-items.js";
import { suggestionsFoodCard } from "./templates.js";

//get elements from the DOM
const foodRow = document.querySelector(".row-food");
const drinksRow = document.querySelector(".row-drinks");
const dessertsRow = document.querySelector(".row-desserts");

function onInit() {
  loadMenuItems();
}

onInit();

function loadMenuItems() {
  if (foodRow && drinksRow && dessertsRow) {
    foodRow.innerHTML = "";
    drinksRow.innerHTML = "";
    dessertsRow.innerHTML = "";

    menuItems.foods.forEach((foodItem) => {
      foodRow.innerHTML += suggestionsFoodCard(foodItem);
    });

    menuItems.drinks.forEach((drinkItem) => {
      drinksRow.innerHTML += suggestionsFoodCard(drinkItem);
    });

    menuItems.desserts.forEach((dessertItem) => {
      dessertsRow.innerHTML += suggestionsFoodCard(dessertItem);
    });
  }
}
