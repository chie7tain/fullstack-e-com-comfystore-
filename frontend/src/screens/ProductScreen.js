import { parseRequestUrl } from "../utils";
import { getProduct } from "../api";
import Rating from "../../components/Rating";
const ProductScreen = {
  render: async () => {
    try {
      const request = parseRequestUrl();
      const product = await getProduct(request.id);
      if (product.error) {
        return `<div>${product.error}</div>`;
      } else {
        return `
          <div class="content">
            <div class="back-to-result">
              <a href="#/">Back to result</a>
            </div>
            <div class="details">
              <div class="details-image">
                <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="details-info">
                  <ul>
                    <li>
                      <h4>${product.name}</h4>
                    </li>
                    <li>
                      ${Rating.render({
                        value: product.rating,
                        text: `${product.numReviews} reviews`,
                      })}
                    </li>
                    <li>
                      Price: <strong>${product.price}</strong>
                    </li>
                    <li>
                      Description:
                      <div>${product.description}</div>
                    </li>
                    </li>
                  </ul>
                </div>
                <div class="details-action">
                  <ul>
                    <li>Price: ${product.price}</li>
                    <li>
                      Status:
                      ${
                        product.countInStock > 0
                          ? `<span class="success">In Stock</span>`
                          : `<span class="error">Out of Stock</span>`
                      }
                    </li>
                    <li>
                      <button id="add-button" class="fw primary">Add to Cart</button>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        `;
      }
    } catch (error) {
      return `<h1>${error.message}</h1>`;
    }
  },
};
export default ProductScreen;
