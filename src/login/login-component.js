import { LitElement, html, css } from 'lit';

class LoginComponent extends LitElement {
  static styles = css`
    lion-button {
      background-color: red;
    }
  `;

  _loginHandler() {
    this.dispatchEvent(
      new CustomEvent('login-success', { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <lion-form>
        <form>
          <lion-input
            label="Username"
            name="username"
            placeholder="Enter your username"
          ></lion-input>
          <lion-input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          ></lion-input>
          <lion-button @click=${this._loginHandler}>Login</lion-button>
        </form>
      </lion-form>
    `;
  }
}

customElements.define('login-component', LoginComponent);
