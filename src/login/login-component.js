import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-form.js';
import '@lion/ui/define/lion-button.js';
import '@lion/ui/define/lion-input.js';
import { userLogin } from '../requests/mock-requests.js';

class LoginComponent extends LitElement {
  static styles = css`
    form {
      width: 300px;
      margin: 0 auto;
      position: relative;
    }

    lion-input {
      width: 100%;
      margin-top: 10px;
    }

    lion-button {
      margin-top: 10px;
      margin-bottom: 10px;
      display: grid;
    }

    .input-wrapper {
      position: relative;
      margin-bottom: 20px;
    }

    .eye-icon {
      position: absolute;
      top: 27px;
      right: 0px;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 20px;
      background: none;
      border: none;
      color: #333;
    }

    .tooltip {
      position: absolute;
      top: 30px;
      right: -20px;
      transform: translateY(-50%);
      display: inline-block;
      cursor: pointer;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 180px;
      background-color: black;
      color: #fff;
      text-align: center;
      padding: 5px;
      border-radius: 6px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -90px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }

    .info-icon {
      font-size: 16px;
      color: #000;
    }

    .error-message {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: red;
      background-color: white;
      padding: 10px;
      border: 1px solid red;
      border-radius: 5px;
      width: 280px;
      text-align: center;
      z-index: 2;
    }

    .form-container {
      position: relative;
      height: 400px;
      overflow: visible;
      margin-top: 80px;
    }
  `;

  static properties = {
    errorMessage: { type: String },
    showPassword: { type: Boolean },
  };

  constructor() {
    super();
    this.errorMessage = '';
    this.showPassword = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  _validatePassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasTwoNumbers = /[0-9].*[0-9]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 20;

    if (!isValidLength) {
      this.errorMessage = 'Password must be between 8 and 20 characters.';
      return false;
    }

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
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      })
      .catch(error => {
        console.error('Error during login request', error);
        this.errorMessage = 'Login failed. Please try again later.';
      });
  }

  render() {
    return html`
      <div class="form-container">
        <lion-form>
          <form>
            <div class="input-wrapper">
              <lion-input
                name="username"
                label="Username"
                placeholder="Enter your username"
              ></lion-input>
              <span class="tooltip info-icon">
                ⓘ
                <span class="tooltiptext">Enter a valid username</span>
              </span>
            </div>

            <div class="input-wrapper">
              <lion-input
                name="password"
                label="Password"
                .type=${this.showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
              ></lion-input>

              <button
                class="eye-icon"
                @click=${this.togglePasswordVisibility}
                type="button"
                aria-label="Toggle password visibility"
              >
                ${
                  this.showPassword
                    ? html`<span>&#128065;</span>` /* Eye icon for 'Hide' */
                    : html`<span>&#128065;</span>` /* Eye icon for 'Show' */
                }
              </button>

              <span class="tooltip info-icon">
                ⓘ
                <span class="tooltiptext"
                  >Password must contain at least one uppercase letter, one
                  special character, and two numbers</span
                >
              </span>
            </div>

            <lion-button type="submit" @click=${this.loginHandler}>
              Login
            </lion-button>
          </form>
        </lion-form>
        ${this.errorMessage
          ? html`<div class="error-message">${this.errorMessage}</div>`
          : ''}
      </div>
    `;
  }
}

customElements.define('login-component', LoginComponent);
