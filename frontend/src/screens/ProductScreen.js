import { parseRequestUrl } from "../utils";
import { getProduct } from "../api";
const ProductScreen = {
  render: async () => {
    try {
      const request = parseRequestUrl();
      const product = await getProduct(request.id);
      if (product.error) {
        return `<div>${product.error}</div>`;
      } else {
        return `<h1>${product.name}</h1>`;
      }
    } catch (error) {
      return `<h1>${error.message}</h1>`;
    }
  },
};
export default ProductScreen;
