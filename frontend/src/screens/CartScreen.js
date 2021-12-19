import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";
import { getCartItems } from "../localStorage";
import { setCartItem } from "../localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (cartItem) => cartItem.product === item.product
  );
  if (existItem) {
    cartItems = cartItems.map((cartItem) =>
      cartItem.product === existItem.product ? item : cartItem
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItem(cartItems);
};

const CartScreen = {
  after_render: () => {},
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
    return `<div>CartScreen</div>
      <div>${getCartItems().length}</div>
    `;
  },
};
export default CartScreen;
