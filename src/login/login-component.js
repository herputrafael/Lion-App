import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-form.js';
import '@lion/ui/define/lion-button.js';
import '@lion/ui/define/lion-input.js';
import { userLogin } from '../requests/mock-requests.js';

class LoginComponent extends LitElement {
  static styles = css`
    /* Set the width of the form */

    form {
      width: 300px; /* Adjust the width as needed */
      margin: 0 auto; /* Center the form horizontally */
    }

    /* Ensure inputs take up full form width */
    lion-input {
      width: 100%;
      margin-top: 10px;
    }

    /* Styling the error message */
    p {
      color: red;
      margin-top: 10px;
    }

    /* Styling the button to be full-width */
    lion-button {
      margin-top: 10px;
      display: grid;
    }
  `;

  static properties = {
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.errorMessage = '';
  }

  _validatePassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasTwoNumbers = /[0-9].*[0-9]/.test(password);

    if (!hasUppercase || !hasSpecialCharacter || !hasTwoNumbers) {
      this.errorMessage =
        'Password must contain at least one uppercase letter, one special character, and two numbers.';
      return false;
    }

    return true;
  }

  _validateForm(username, password) {
    if (!username) {
      this.errorMessage = 'Username is required.';
      return false;
    }
    if (!password) {
      this.errorMessage = 'Password is required.';
      return false;
    }
    return true;
  }

  loginHandler(event) {
    event.preventDefault();

    const username =
      this.shadowRoot.querySelector('[name="username"]').modelValue;
    const password =
      this.shadowRoot.querySelector('[name="password"]').modelValue;

    this.errorMessage = '';

    if (!this._validateForm(username, password)) {
      return;
    }

    if (!this._validatePassword(password)) {
      return;
    }

    userLogin(username, password)
      .then(response => {
        if (response.success) {
          this.dispatchEvent(
            new CustomEvent('login-success', {
              detail: { user: response.user, token: response.token },
              bubbles: true,
              composed: true,
            }),
          );
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.'; // Show error message below the form
        }
      })
      .catch(error => {
        console.error('Error during login request', error);
        this.errorMessage = 'Login failed. Please try again later.';
      });
  }

  render() {
    return html`
      <div>
        <div>
          ${this.errorMessage
            ? html`<p style="color: red;">${this.errorMessage}</p>`
            : ''}
        </div>
        <div>
          <lion-form>
            <form>
              <lion-input
                name="username"
                label="Username"
                placeholder="Enter your username"
              ></lion-input>
              <lion-input
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              ></lion-input>
              <lion-button type="submit" @click=${this.loginHandler}
                >Login</lion-button
              >
            </form>
          </lion-form>
        </div>
      </div>
    `;
  }
}

customElements.define('login-component', LoginComponent);
