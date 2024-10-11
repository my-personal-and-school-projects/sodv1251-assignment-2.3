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
