import { getProduct } from "../api";
import { parseRequestUrl, rerender } from "../utils";
import { getCartItems, setCartItems } from "../localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (cartItem) => cartItem.product === item.product
  );
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((cartItem) =>
        cartItem.product === existItem.product ? item : cartItem
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((cartItem) => cartItem.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    rerender(CartScreen);
  }
};
const CartScreen = {
  after_render: () => {
    const qtySelects = [...document.querySelectorAll(".qty-select")];
    qtySelects.forEach((qtySelect) => {
      qtySelect.addEventListener("change", (e) => {
        const item = getCartItems().find(
          (cartItem) => cartItem.product === qtySelect.id
        );
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = [...document.querySelectorAll(".delete-button")];
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        removeFromCart(deleteButton.id);
      });
    });
    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = "/signin";
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      if (product.error) {
        return `<div>${product.error}</div>`;
      } else {
        addToCart({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          countInStock: product.countInStock,
          qty: 1,
        });
      }
    }
    const cartItems = getCartItems();
    return `<div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>
              Shopping Cart
            </h3>
            <div>
              Price
            </div>
          </li>
          ${
            cartItems.length === 0
              ? `<div>Cart is empty. <a href="/#/">Go Shopping </a></div>`
              : cartItems
                  .map(
                    (item) => `
            <li>
              <div class="cart-image">
                <img src="${item.image}" alt="${item.name}" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.product}">${item.name}</a>
                </div>
                <div>
                    Qty:
                  <select class="qty-select" id="${item.product}">
                    ${[...Array(item.countInStock).keys()].map((x) =>
                      item.qty === x + 1
                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                        : `<option value="${x + 1}">${x + 1}</option>`
                    )}")}
                  </select>
                  <button type="button" class="delete-button" id="${
                    item.product
                  }">Remove</button>
                </div>
              <div class="cart-price">
                $${item.price}
              </div>
            </li>
          `
                  )
                  .join("\n")
          }
        </ul>
      </div>
      <div class="cart-action">
          <h3>
            Subtotal(${cartItems.reduce(
              (a, c) => a + c.qty,
              0
            )} items) : $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button class="primary fw" id="checkout-button">
            Proceed to Checkout
          </button>
      </div>
    </div>
    `;
  },
};
export default CartScreen;
