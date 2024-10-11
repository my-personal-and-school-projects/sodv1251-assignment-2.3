import { menuItems } from "./menu-items.js";
import { shoppingCartCard } from "./templates.js";

/* Get necessary components from the DOM */
const cartItemsContainer = document.querySelector(".cart-item-card-container");
const cartSubtotal = document.querySelector(".cart-subtotal");
const cartGST = document.querySelector(".cart-gst");
const cartTotal = document.querySelector(".cart-total");

let itemsInCart = [];
let subtotal = 0;

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

  parsedItems = shoppingCartItems.flat();
  console.log("Shopping cart", parsedItems);

  return parsedItems;
}

/**
 * Process items from the shooping cart, render them and
 * update totals
 */
function renderCartItems() {
  let parsedItems = [];
  let price = 0;
  let grandTotal = 0;
  itemsInCart = getOrderFromLocalStorage();

  if (itemsInCart.length > 0) {
    cartItemsContainer.innerHTML = "";

    itemsInCart.forEach((cartItem) => {
      parsedItems.push(cartItem);
    });

    parsedItems.forEach((parsedItem) => {
      cartItemsContainer.innerHTML += shoppingCartCard(parsedItem);
      subtotal += parseFloat(parsedItem.price * parsedItem.qty);
      price = parsedItem.price;
      handleQuantityInput(parsedItem);

      let orderedItem = menuItems.find(
        (item) => item.id === Number(parsedItem.id)
      );

      grandTotal += orderedItem.calculate_totalcost(parsedItem.qty, 0.05, 0);
      console.log("gran total:", grandTotal);
    });

    cartTotal.innerHTML = grandTotal;

    cartSubtotal.textContent = subtotal.toFixed(2);
  } else {
    cartItemsContainer.innerHTML = "";

    cartItemsContainer.innerHTML = `
    <h3 class="w-50 m-auto text-center text-danger py-5">Cart Empty</h3>
    `;
  }
}

/**
 * Update the price tag based on the quantity input
 * @param {*} cartItem
 */
function handleQuantityInput(item) {
  let itemqty = 0;
  const inputQtyGroup = document.querySelectorAll(".input-qty");

  let totalPrice = 0;
  inputQtyGroup.forEach((input) => {
    const cardWrapper = input.closest(".cart-card-wrapper");
    const priceTag = cardWrapper.querySelector(".price-tag");
    const pricePerItem = parseFloat(priceTag.dataset.price);

    input.addEventListener("input", (event) => {
      event.preventDefault;

      itemqty = parseFloat(event.target.value);

      if (!isNaN(itemqty) & (itemqty >= 0)) {
        totalPrice = pricePerItem * itemqty;
        priceTag.textContent = totalPrice.toFixed(2);
      } else {
        priceTag.textContent = "0.00";
      }
    });
    updateSubtotal(item);
  });
}

/**
 * Update cart subtotal
 */
function updateSubtotal() {
  const priceTags = document.querySelectorAll(".price-tag");
  let subtotal = 0;
  let gst = 0;

  priceTags.forEach((priceTag) => {
    const priceValue = parseFloat(priceTag.textContent) || 0;
    subtotal += priceValue;

    let itemGST = priceValue * 0.05;
    gst += parseFloat(itemGST);
  });

  cartSubtotal.innerHTML = subtotal.toFixed(2);
  cartGST.innerHTML = gst.toFixed(3);
}
