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

export let orderItem = "";

let foodCategory = "";
//track if the menu has been loaded
let isMenuLoaded = false;
const taxRate = 0.05;
const targetPage = "";

function onInit() {
  handleBtnOrder();

  loadHTMLLayoutComponents(
    "./components/nav-bar.html",
    ".nav-bar-container"
  ).then(() => {
    updateShoppingCartItemsCounter();
  });
  loadHTMLLayoutComponents("./components/footer.html", ".footer-container");

  isMenuLoaded = false;

  generateRandomFoodItems();
  const cartItemsCounterLabel = document.querySelector(".cart-items");
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
//TODO: fix function, foods logging null
function generateRandomFoodItems() {
  if (foodSuggestionsRow) {
    foodSuggestionsRow.innerHTML = "";
    const foodSuggestions = [];

    const randomFoodCategories = getRandomFoodItems(menuItems, 12);
    console.log("Foods: ", randomFoodCategories.foods);

    randomFoodCategories.forEach((item) => {
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

document.querySelectorAll(`.dropdown-item`).forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (window.location.pathname.endsWith("/menu")) {
      return;
    }
  });
});

/* document
  .querySelector(".btn-shopping-cart")
  .addEventListener("click", (event) => {
    event.preventDefault();
  }); */

/*   function getOrderItem() {
    const orderItemButtons = document.querySelectorAll(".order-item");
  
    if (orderItemButtons) {
      orderItemButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const orderItemData = button.getAttribute("data-item");
          orderItem = JSON.parse(orderItemData);
          
          console.log(orderItemData);
        });
      });
    }
  } */

function updateShoppingCartItemsCounter() {
  let parsedQuantities = [];
  let qty = JSON.parse(localStorage.getItem("quantities")) || [];
  const cartItemsCounterLabel = document.querySelector(".cart-items");

  console.log("label", cartItemsCounterLabel);
  qty.forEach((quantity) => {
    parsedQuantities.push(quantity);
    console.log(quantity);
    cartItemsCounterLabel.textContent = "";
    cartItemsCounterLabel.textContent += parseInt(quantity);
  });
}
