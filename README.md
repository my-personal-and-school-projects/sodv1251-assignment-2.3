# Restaurant Menu and Ordering System

This project implements a dynamic restaurant menu and ordering system using JavaScript. The system allows customers to view a menu, select items, place orders, and calculate the total cost, including tax. The project covers creating menu items, displaying them, and allowing users to interact with the menu through a form.

## Features

- Menu item creation using JavaScript objects
- Dynamic display of menu items
- User-friendly ordering system
- Real-time calculation of total order cost
- Form validation for order input
- **Navigation for browsing through different sections of the menu**
- **Server for serving static pages**

## Technologies Used

- JavaScript (for logic)
- HTML (for structure)
- CSS (for basic styling)
- Bootstrap (styling)
- Node.js(static pages server)

## Task 1: Create a JavaScript Object for a Menu Item

To represent each menu item, I created a JavaScript object called `menuItem`. Each `menuItem` includes properties for the name, description, price, and ingredients. Additionally, a method was added to calculate the total cost of the item, including tax and discounts.

### Code Snippet:

```javascript
// Creating a Menu Item object
export const menuItem = {
  id: 0,
  name: "Cheese Burger",
  description: "A delicious burger with lettuce, tomato, and cheese.",
  price: 8.99,
  ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Bun"],
  img_url: "./images/img",
  category: "foods",
  qty: 1,

  calculate_totalcost: function (qty, taxRate, discount) {
    const subtotal = this.price * qty;
    const taxAmount = parseFloat((subtotal * taxRate).toFixed(3));
    const discountAmount = subtotal * discount;

    const totalCost = subtotal + taxAmount - discountAmount;

    return totalCost;
  },
};
```

## Task 2: Create an Array of Menu Items

I created an array to store multiple `menuItem` objects. This array contains 25+ different items, each with its own unique properties.

### Code Snippet:

```javascript
import { menuItem } from "./menu-item.js";

export const menuItems = [
  {
    ...menuItem,
    id: 1,
    name: "Classic Burger",
    description: "A delicious burger with lettuce, tomato, and cheese.",
    price: 8.99,
    ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Bun"].join(
      ", "
    ),
    img_url: "./assets/images/food-1.png",
    category: "foods",
    qty: 1,
  },
  //. . . Rest of the array

```

## Task 3: Display the Menu on the Website

Using JavaScript, I dynamically displayed the menu items on the webpage. Each item’s name, description, and price are shown in a user-friendly scrollable list format.

### Code Snippet:

```javascript
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
    //Rest of the code

    //Template
    export const suggestionsFoodCard = (menuItem) => `
<div class="col-lg-3 col-sm-6 col-md-4">
    <div class="card suggestions-card">
        <div class="card-image-container">
        <img src="${menuItem.img_url}" alt="food image" />
        </div>
        <div class="card-description">
        <div class="d-flex justify-content-between py-2 description-container">
            <p><strong>${menuItem.name}</strong></p>
            <p><span>$ ${menuItem.price}</span></p>
        </div>
        <a href="/order?item=${encodeURIComponent(
          JSON.stringify(menuItem.id)
        )}" class="order-item text-decoration-none text-success">
            Order this item
        </a>
        </div>
    </div>
</div>
`;
```

## Task 4: Allow Customers to Place Orders

I implemented an order form that allows customers to select menu items by clicking a link in the items lists and then enter the quantity they want to order. JavaScript is used to calculate the total cost based on the selected items and quantity.

## Task 5: Validate user input.

## Task 6: Submit the order

To complete the ordering process, I implemented a confirmation page that displays a message to the customer indicating that their order has been received. The confirmation page dynamically displays details such as the order number, total amount, delivery date, and payment method. The values are passed from the previous page and are used to populate the relevant sections of the confirmation page, giving the customer a clear overview of their order.

The confirmation message ensures a smooth user experience and confirms that their order has been successfully processed.

## Please see videoclip for demonstration
