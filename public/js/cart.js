import { menuItems } from "./menu-items.js";
import { shoppingCartCard } from "./templates.js";

/* Get necessary components from the DOM */
const cartItemsContainer = document.querySelector(".cart-item-card-container");
const cartSubtotal = document.querySelector(".cart-subtotal");
let itemsInCart = [];
let subtotal = 0;

function onInit() {
  //getOrderFromLocalStorage();
  renderCartItems();
}
onInit();

//get shopping cart items from the localStorage
function getOrderFromLocalStorage() {
  const orderItemData = localStorage.getItem("shoppingCartItems");

  if (orderItemData) {
    const orderItems = JSON.parse(orderItemData);
    console.log("items in cart: ", orderItems);
    return orderItems;
  }
}

function renderCartItems() {
  itemsInCart = getOrderFromLocalStorage();
  cartItemsContainer.innerHTML = "";

  console.log(itemsInCart);

  let orderedItem = menuItems.filter((item) => item.id === Number(itemsInCart));

  console.log(orderedItem);

  orderedItem.forEach((item) => {
    cartItemsContainer.innerHTML = shoppingCartCard(item);
    subtotal += parseFloat(item.price);
  });

  cartSubtotal.textContent = subtotal;
}
