import { menuItems } from "./menu-items.js";
import { shoppingCartCard } from "./templates.js";

/* Get necessary components from the DOM */
const cartItemsContainer = document.querySelector(".cart-item-card-container");
const cartSubtotal = document.querySelector(".cart-subtotal");
const cartGST = document.querySelector(".cart-gst");
const cartTotal = document.querySelector(".cart-total");

let itemsInCart = [];
let parsedItems = [];
let subtotal = 0;
let itemQty = 0;

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
  let price = 0;
  let grandTotal = 0;
  itemsInCart = getOrderFromLocalStorage();

  gotoConfirmation(parsedItems);

  if (itemsInCart.length > 0) {
    cartItemsContainer.innerHTML = "";

    itemsInCart.forEach((cartItem) => {
      parsedItems.push(cartItem);
    });

    parsedItems.forEach((parsedItem) => {
      cartItemsContainer.innerHTML += shoppingCartCard(parsedItem);
      subtotal += parseFloat(parsedItem.price * parsedItem.qty);
      price = parsedItem.price;
      handleQuantityInput();
      handleRemoveItemButtons();

      /* TODO: Implement Logic to remove items from the cart */

      /* TODO: If possible implement logic to do not allow duplicated cards
      in the shopping cart and increase the qty on instead */

      let orderedItem = menuItems.find(
        (item) => item.id === Number(parsedItem.id)
      );

      grandTotal += orderedItem.calculate_totalcost(parsedItem.qty, 0.05, 0);
      console.log("gran total:", grandTotal);
    });

    cartTotal.innerHTML = grandTotal.toFixed(3);

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
function handleQuantityInput() {
  const inputQtyGroup = document.querySelectorAll(".input-qty");

  inputQtyGroup.forEach((input) => {
    const cardWrapper = input.closest(".cart-card-wrapper");
    const priceTag = cardWrapper.querySelector(".price-tag");
    const pricePerItem = parseFloat(priceTag.dataset.price);

    input.addEventListener("input", (event) => {
      event.preventDefault();

      itemQty = parseFloat(event.target.value);

      if (!isNaN(itemQty) && itemQty >= 0) {
        const totalPrice = pricePerItem * itemQty;
        priceTag.textContent = totalPrice.toFixed(2);
      } else {
        priceTag.textContent = "0.00";
      }

      updateSubtotal();
    });
    updateSubtotal();
  });
}

/**
 * Update cart subtotal
 */
function updateSubtotal() {
  const priceTags = document.querySelectorAll(".price-tag");
  let subtotal = 0;
  let gst = 0;
  let grandTotal = 0;

  priceTags.forEach((priceTag) => {
    const priceValue = parseFloat(priceTag.textContent) || 0;
    subtotal += priceValue;

    // Calculate GST
    let itemGST = priceValue * 0.05;
    gst += parseFloat(itemGST);
  });

  // Update the subtotal and GST values
  cartSubtotal.innerHTML = subtotal.toFixed(2);
  cartGST.innerHTML = gst.toFixed(3);

  // Calculate and update the grand total
  grandTotal = subtotal + gst;
  cartTotal.innerHTML = grandTotal.toFixed(2);
}

/**
 * Go to otrder confirmation and reset the cart
 * @param {*} parsedItems
 */
function gotoConfirmation() {
  const btnPlaceOrder = document.querySelector(".btn-place-order");

  if (itemsInCart.length === 0) {
    btnPlaceOrder.classList.add("disabled");
  } else {
    btnPlaceOrder.addEventListener("click", (event) => {
      event.preventDefault();

      //Reset the cart
      parsedItems = [];
      localStorage.removeItem("shoppingCartItems");
      localStorage.removeItem("quantities");

      window.location.href = "confirmation-order";
    });
  }
}

function handleRemoveItemButtons() {
  const resetButtons = document.querySelectorAll(".btn-remove-item");

  if (resetButtons) {
    resetButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const itemId = JSON.parse(event.target.dataset.item);
        removeItems(itemId);
      });
    });
  }
}

function removeItems(itemId) {
  let qtyToRemove = 0;
  if (itemId != null) {
    const shoppingCartItems = getOrderFromLocalStorage();

    let itemToRemove = shoppingCartItems.find((item) => item.id === itemId);

    if (itemToRemove) {
      qtyToRemove = parseFloat(itemToRemove.qty);
    }

    let updatedShoppingCartItems = shoppingCartItems.filter(
      (item) => item.id !== itemId
    );

    localStorage.setItem(
      "shoppingCartItems",
      JSON.stringify(updatedShoppingCartItems)
    );

    let totalQty = parseInt(localStorage.getItem("quantities")) || 0;
    let updatedQty = totalQty - qtyToRemove;
    localStorage.setItem("quantities", JSON.stringify(updatedQty));

    window.location.href = "cart";
  }
}
