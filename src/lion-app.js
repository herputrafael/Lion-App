import { LitElement, html, css } from 'lit';
import './header-component.js';
import './footer-component.js';
import './main-app-component.js';
import './login/login-component.js';
import './login/logout-component.js';

class LionApp extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
    user: { type: Object },
    token: { type: String },
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
    this.isLoggedIn = false;
    this.user = null;
    this.token = '';
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

  _onLoginSuccess(event) {
    const { user, token } = event.detail;
    this.user = user;
    this.token = token;
    this.isLoggedIn = true;
  }

  _onLogoutSuccess() {
    this.isLoggedIn = false;
  }

  render() {
    return html`
      <header-component .isLoggedIn=${this.isLoggedIn}></header-component>
      <main>
        ${this.isLoggedIn
          ? html`
              <main-app-component
                .user=${this.user}
                .token=${this.token}
              ></main-app-component>
            `
          : html`<login-component></login-component>`}
      </main>
      <footer-component></footer-component>
    `;
  }
}

customElements.define('lion-app', LionApp);
