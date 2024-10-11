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

export const foodOrderCard = (menuItem) => `
<div class="food-order-card d-block h-auto">
    <div class="order-card-image-container">
    <img src="${menuItem.img_url}" alt="food image" />
    </div>
    <div class="order-card-description p-4">
        <div>
            <ul class="p-0">
            <li class="list-group-item">
                <a href="/" class="">Home</a>
                /
                <a href="/menu" class="">Menu</a>
            </li>
            </ul>
        </div>
    <h2>${menuItem.name}</h2>
    <p><span>$${menuItem.price}</span></p>
    <p>${menuItem.description}</p>
    <p><strong>Ingredients</strong>: ${menuItem.ingredients}</p>
    </div>
</div>
`;

export const shoppingCartCard = (menuItem) => `

<div class="row cart-card-wrapper border-bottom border-secondary-subtle">
    <div class="cart-item-card col-6">
    <p><strong>${menuItem.name}</strong></p>
    <p class="py-3">${menuItem.description}</p>
    <div>
        <button class="btn-remove-item">Remove</button>
    </div>
    </div>
    <div class="col-6 d-flex flex-column align-items-end">
    <p class="py-3">$<span class="price-tag" data-price="${menuItem.price}">${
  menuItem.price * menuItem.qty
}</span></p>
    <input
        class="input-qty form-control w-50"
        type="number"
        value="${menuItem.qty}"
    />
    </div>
</div>
`;
