const cartData = {
  original_total_price: 250000,
  items: [
    {
      id: 49839206859071,
      quantity: 1,
      title: "Asgaard sofa",
      price: 25000000,
      line_price: 25000000,
      final_line_price: 25000000,
      image:
        "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481",
      product_description:
        "The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials.",
    },
  ],
  currency: "INR",
};
function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount / 100);
}
function populateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSubtotalElement = document.getElementById("cart-subtotal");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cartData.items.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <img src="${item.image}" alt="${item.title}" class="product-image" />

          
        </td>
        <td><div class="product-info">
            <span>${item.title}</span>
          </div></td>
        <td>${formatCurrency(item.price, cartData.currency)}</td>
        <td>
          <input
            type="number"
            value="${item.quantity}"
            min="1"
            class="quantity-input"
            data-item-id="${item.id}"
          />
        </td>
        <td>${formatCurrency(item.line_price, cartData.currency)}</td>
        <td>
        <button class="remove-item" data-item-id="${item.id}">
           <img src="./ant-design_delete-filled.png" alt="Remove Item">
          </button>
        </td>
      `;

    cartItemsContainer.appendChild(row);

    subtotal += item.line_price;
  });

  cartSubtotalElement.textContent = formatCurrency(subtotal, cartData.currency);
  cartTotalElement.textContent = formatCurrency(subtotal, cartData.currency);
}
document.addEventListener("click", (event) => {
    if (event.target.closest(".remove-item")) {
      const button = event.target.closest(".remove-item"); 
      const itemId = button.dataset.itemId;
      const itemIndex = cartData.items.findIndex((item) => item.id == itemId);
      if (itemIndex !== -1) {
        cartData.items.splice(itemIndex, 1); 
      }
  
      populateCart();
    }
  });

document.addEventListener("input", (event) => {
  if (event.target.classList.contains("quantity-input")) {
    const itemId = event.target.dataset.itemId;
    const newQuantity = parseInt(event.target.value, 10);

    const item = cartData.items.find((item) => item.id == itemId);
    if (item && newQuantity > 0) {
      item.quantity = newQuantity;
      item.line_price = item.price * newQuantity;
    }

    populateCart();
  }
});

populateCart();

// Create a style element
const style = document.createElement('style');
style.innerHTML = `
    .remove-item {
        background-color: transparent; /* Red background for the delete button */
        border: none; /* No border */
        cursor: pointer; /* Pointer cursor on hover */
        transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */
    }

    .remove-item img {
        width: 20px; /* Adjust size as needed */
        height: auto;
    }
    /* Button active effect */
    .remove-item:active {
        transform: scale(2.1); 
    }
`;
document.head.appendChild(style);
const button = document.createElement('button');
button.className = 'remove-item'; 
button.setAttribute('data-item-id', item.id); 
button.innerHTML = '<img src="./images/ant-design_delete-filled.png" alt="Remove Item">'; 
document.body.appendChild(button); 





