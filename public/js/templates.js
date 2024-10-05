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
        <a href="/order" class="text-decoration-none text-success">
            Order this item
        </a>
        </div>
    </div>
</div>
`;
