import { foodOrderCard } from "./templates.js";
import { menuItems } from "./menu-items.js";

/* get the necesary component from the DOM */
const foodOrderCardContainer = document.querySelector(
  ".food-order-card-container"
);
const priceTag = document.querySelector(".btn-add-to-cart span");
const itemQty = document.querySelector(".input-qty ");
const addToCartButton = document.querySelector(".btn-add-to-cart");

/* variables */
let itemPrice = 0;
let shoppingCartItems = [];

function onInit() {
  getSelectedfoodItem();
  // console.log(orderItem);
}

onInit();

/**
 * Retrive the food item id from the URL, find the matching food item
 * within the menu-items array and render its info
 */
function getSelectedfoodItem() {
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("item");

  if (itemId) {
    let orderedItem = menuItems.filter((item) => item.id === Number(itemId));
    foodOrderCardContainer.innerHTML = "";

    orderedItem.forEach((item) => {
      foodOrderCardContainer.innerHTML = foodOrderCard(item);
      itemPrice = item.price;
      priceTag.textContent = itemPrice;
      itemQty.value = orderedItem.length;
    });
    console.log(orderedItem);
  }
}

//store the cart items in localStorage
addToCartButton.addEventListener("click", (event) => {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("item");
  shoppingCartItems.push(itemId);

  console.log(shoppingCartItems);

  localStorage.setItem("shoppingCartItems", shoppingCartItems);
  window.location.href = "/menu";
});
