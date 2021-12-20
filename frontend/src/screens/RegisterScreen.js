import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser();
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      return redirectUser();
    }
    return `
    <div class="form-container">
      <form id="register-form">
        <ul class="form-items">
          <li>
            <h1>Sign Up</h1>
          </li>
          <li>
            <label for="name">Name</label>
            <input type="name" id="name" name="name" placeholder="Name" required>
          </li>
          <li>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" required>
          </li>
          <li>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
          </li>
          <li>
            <label for="repassword">Confirm Password</label>
            <input type="password" id="repassword" name="repassword" placeholder="Confirm Password" required>
          </li>
          <li>
            <button type="submit" class="primary">Register</button>
          </li>
          <li>
            <div>
              Already Have an Account ? <a href="/#/signin">Sign In</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
      `;
  },
};
export default RegisterScreen;
