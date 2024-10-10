import { menuItems } from "./menu-items.js";
import { shoppingCartCard } from "./templates.js";

/* Get necessary components from the DOM */
const cartItemsContainer = document.querySelector(".cart-item-card-container");
const cartSubtotal = document.querySelector(".cart-subtotal");
let itemsInCart = [];

let subtotal = 0;
let itemQuantity = 0;

function onInit() {
  //getOrderFromLocalStorage();
  renderCartItems();
}
onInit();

/**
 * get shopping cart items from the localStorage
 * @returns array of parsed food items
 */
function getOrderFromLocalStorage() {
  let parsedItems = [];
  let shoppingCartItems =
    JSON.parse(localStorage.getItem("shoppingCartItems")) || [];

  console.log("Shopping cart", shoppingCartItems);

  shoppingCartItems.forEach((cartItemArray) => {
    cartItemArray.forEach((cartItem) => {
      parsedItems.push(cartItem);
    });
  });

  return parsedItems;
}

/**
 * Process items from the shooping cart, render them and
 * update totals
 */
function renderCartItems() {
  let parsedItems = [];
  itemsInCart = getOrderFromLocalStorage();

  //TODO: Needs to be simplified, seems there is one unecessary loop
  if (itemsInCart.length > 0) {
    cartItemsContainer.innerHTML = "";

    itemsInCart.forEach((cartItem) => {
      parsedItems.push(cartItem);
    });

    parsedItems.forEach((parsedItem) => {
      cartItemsContainer.innerHTML += shoppingCartCard(parsedItem);
      subtotal += parseFloat(parsedItem.price * parsedItem.qty);
    });

    cartSubtotal.textContent = subtotal.toFixed(2);
  } else {
    cartItemsContainer.innerHTML = "";

    cartItemsContainer.innerHTML = `
    <h3 class="w-50 m-auto text-center text-danger py-5">Cart Empty</h3>
    `;
  }
}
