import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, getShipping, setShipping } from "../localStorage";

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById("shopping-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          postalCode: document.getElementById("postalCode").value,
          country: document.getElementById("country").value,
        });
        document.location.hash = "/payment";
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      return (document.location.hash = "/");
    }
    const { address, city, postalCode, country } = getShipping();

    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
    <div class="form-container">
      <form id="shopping-form">
        <ul class="form-items">
          <li>
            <h1>Shipping</h1>
          </li>
          <li>
            <label for="address">Address</label>
            <input type="text" id="address" name="address" placeholder="Address" value="${address}">
          </li>
          <li>
            <label for="city">City</label>
            <input type="text" id="city" name="city" placeholder="City" value="${city}">
          </li>
          <li>
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" name="postalCode" placeholder="PostalCode" value="${postalCode}">
          </li>
          <li>
            <label for="country">Country</label>
            <input type="text" id="country" name="country" placeholder="Country" value="${country}">
          </li>
          <li>
            <button type="submit" class="primary">Continue</button>
          </li>
        </ul>
      </form>
    </div>
      `;
  },
};
export default ShippingScreen;
