import { LitElement, html, css } from 'lit';
import './header-component.js';
import './footer-component.js';
import './main-app-component.js';
import './login/login-component.js';
import './login/logout-component.js';
import './user/user-details-component.js';

class LionApp extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
    userData: { type: Object },
    token: { type: String },
    showUserDetails: { type: Boolean },
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
    this.showUserDetails = false;
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
    this.addEventListener('show-user-details', this._onShowUserDetails);
    this.addEventListener('redirect-to-main', this._redirectToMain);
    this.addEventListener('back-to-main', this._redirectToMain);
  }

  disconnectedCallback() {
    this.removeEventListener('login-success', this._onLoginSuccess);
    this.removeEventListener('logout-success', this._onLogoutSuccess);
    this.removeEventListener('show-user-details', this._onShowUserDetails);
    this.removeEventListener('redirect-to-main', this._redirectToMain);
    this.removeEventListener('back-to-main', this._redirectToMain);
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
    this.showUserDetails = false;

    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  }

  _onShowUserDetails() {
    this.showUserDetails = true;
  }

  _redirectToMain() {
    this.showUserDetails = false;
  }

  getUserInitials() {
    if (this.userData && this.userData.name) {
      const nameParts = this.userData.name.split(' ');
      const initials = nameParts
        .map(part => part[0])
        .join('')
        .toUpperCase();
      return initials;
    }
    return 'U';
  }

  render() {
    let mainContent;

    if (this.isLoggedIn) {
      if (this.showUserDetails) {
        mainContent = html`<user-details-component
          .user=${this.userData}
        ></user-details-component>`;
      } else {
        mainContent = html`<main-app-component
          .user=${this.userData}
        ></main-app-component>`;
      }
    } else {
      mainContent = html`<login-component></login-component>`;
    }

    return html`
      <header-component
        .userInitials=${this.getUserInitials()}
        .isLoggedIn=${this.isLoggedIn}
      ></header-component>
      <main>${mainContent}</main>
      <footer-component></footer-component>
    `;
  }
}

customElements.define('lion-app', LionApp);
