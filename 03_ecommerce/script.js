document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("tasks")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Show products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // Add to cart
  productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveItem();
    renderCart();
  }

  // remove item at particular position
  function removeFromCart(index) {
    cart.splice(index, 1);
    saveItem();
    renderCart();
  }

  // save task into local storage
  function saveItem() {
    localStorage.setItem("items", JSON.stringify(cart));
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("product");
        cartItem.innerHTML = `<span>${item.name} - $${item.price.toFixed(
          2
        )}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
    } else {
      cartTotalMessage.classList.add("hidden");
      emptyCartMessage.classList.remove("hidden");
      cartItems.appendChild(emptyCartMessage);
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  // remove item from cart
  cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      removeFromCart(index);
    }
  })

  // Checkout button
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    renderCart();
  });
});
