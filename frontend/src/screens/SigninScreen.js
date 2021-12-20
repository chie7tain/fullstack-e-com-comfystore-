import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const SigninScreen = {
  after_render: () => {
    document
      .getElementById("signin-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = await signin({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        if (data.error) {
          alert(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = "/";
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      return (document.location.hash = "/");
    }
    return `
    <div class="form-container">
      <form id="signin-form">
        <ul class="form-items">
          <li>
            <h1>Sign In</h1>
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
            <button type="submit" class="primary">Sign In</button>
          </li>
          <li>
            <div>
              New User ? <a href="/#/register">Sign Up</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
      `;
  },
};
export default SigninScreen;
