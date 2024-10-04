import { menuItems } from "./menu-items.js";
import { suggestionsFoodCard } from "./templates.js";

// Selectors for main components
const foodSuggestionsRow = document.querySelector(".row-food-suggestions");
const btnOrder = document.querySelector(".btn-order");

const foodCategories = {
  foods: [],
  drinks: [],
  desserts: [],
};

let foodCategory = "";
//track if the menu has been loaded
let isMenuLoaded = false;
const taxRate = 0.05;
const targetPage = "";

//get data
const foodData = menuItems[foodCategory];

function onInit() {
  handleBtnOrder();
  loadHTMLLayoutComponents("./components/nav-bar.html", ".nav-bar-container");
  loadHTMLLayoutComponents("./components/footer.html", ".footer-container");

  isMenuLoaded = false;

  generateRandomFoodItems();
}
onInit();

/**
 * Sort/shuffle the food data array using the
 * Fisher-Yates (Knuth) Shuffle algorithm,
 * @param {*} array
 * @returns
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/**
 * Get the random items to display for the suggestions
 * @param {*} data
 * @param {*} mealCount
 * @returns
 */
function getRandomFoodItems(data, mealCount) {
  const randomizedData = shuffleArray([...data]);
  return randomizedData.slice(0, mealCount);
}

function generateRandomFoodItems() {
  if (foodSuggestionsRow) {
    foodSuggestionsRow.innerHTML = "";
    const foodSuggestions = [];

    const randomFoodCategories = {
      foods: getRandomFoodItems(menuItems.foods, 6),
      drinks: getRandomFoodItems(menuItems.drinks, 3),
      desserts: getRandomFoodItems(menuItems.desserts, 3),
    };
    console.log("Foods: ", randomFoodCategories.foods);

    randomFoodCategories.foods.forEach((item) => {
      foodSuggestions.push(item);
    });

    randomFoodCategories.drinks.forEach((item) => {
      foodSuggestions.push(item);
    });

    randomFoodCategories.desserts.forEach((item) => {
      foodSuggestions.push(item);
    });

    const assortedFoodSuggestions = foodSuggestions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    assortedFoodSuggestions.forEach((sugestion) => {
      foodSuggestionsRow.innerHTML += suggestionsFoodCard(sugestion);
    });
  }
}

function handleBtnOrder() {
  if (btnOrder) {
    btnOrder.addEventListener("click", () => {
      const foodContainer = document.querySelector(".row-food");
      foodContainer.innerHTML = "";

      foodData.forEach((food) => {
        foodContainer.innerHTML += suggestionsFoodCard(food);
      });
    });
  }
}

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

document.querySelectorAll(`.dropdown-item`).forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (window.location.pathname.endsWith("/menu")) {
      return;
    }
  });
});
