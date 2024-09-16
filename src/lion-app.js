import { LitElement, html, css } from 'lit';
import './header-component.js';
import './footer-component.js';
import './main-app-component.js';
import './login/login-component.js';
import './login/logout-component.js';

class LionApp extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
    userData: { type: Object },
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
    this.userData = null;
    this.token = '';
  }

  connectedCallback() {
    super.connectedCallback();

    const savedUserData = localStorage.getItem('userData');
    const savedToken = localStorage.getItem('token');

    if (savedUserData && savedToken) {
      this.userData = JSON.parse(savedUserData);
      this.token = savedToken;
      this.isLoggedIn = true;
    }

    this.addEventListener('login-success', this._onLoginSuccess);
    this.addEventListener('logout-success', this._onLogoutSuccess);
  }

  disconnectedCallback() {
    this.removeEventListener('login-success', this._onLoginSuccess);
    this.removeEventListener('logout-success', this._onLogoutSuccess);
    super.disconnectedCallback();
  }

  _onLoginSuccess(event) {
    const { userData, token } = event.detail;
    this.userData = userData;
    this.token = token;
    this.isLoggedIn = true;

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', token);
  }

  _onLogoutSuccess() {
    this.isLoggedIn = false;
    this.userData = null;
    this.token = '';

    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  }

  render() {
    return html`
      <header-component .isLoggedIn=${this.isLoggedIn}></header-component>
      <main>
        ${this.isLoggedIn && this.userData
          ? html`
              <main-app-component .user=${this.userData}> </main-app-component>
            `
          : html`<login-component></login-component>`}
      </main>
      <footer-component></footer-component>
    `;
  }
}

customElements.define('lion-app', LionApp);
