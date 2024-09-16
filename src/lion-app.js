import { LitElement, html, css } from 'lit';
import './header-component.js';
import './footer-component.js';
import './main-app-component.js';
import './login/login-component.js';
import './login/logout-component.js';

class LionApp extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: white;
    }

    main {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  constructor() {
    super();
    this.isLoggedIn = false; // Initially, the user is not logged in
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('login-success', this._onLoginSuccess);
    this.addEventListener('logout-success', this._onLogoutSuccess);
  }

  disconnectedCallback() {
    this.removeEventListener('login-success', this._onLoginSuccess);
    this.removeEventListener('logout-success', this._onLogoutSuccess);
    super.disconnectedCallback();
  }

  _onLoginSuccess() {
    this.isLoggedIn = true; // User is logged in
  }

  _onLogoutSuccess() {
    this.isLoggedIn = false; // User is logged out
  }

  render() {
    return html`
      <header-component></header-component>
      <main>
        ${this.isLoggedIn
          ? html`
              <div>Main Lion App</div>
              <logout-component></logout-component>
            `
          : html`<login-component></login-component>`}
      </main>
      <footer-component></footer-component>
    `;
  }
}

customElements.define('lion-app', LionApp);
