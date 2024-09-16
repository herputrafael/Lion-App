import { LitElement, html, css } from 'lit';

class UserMenuComponent extends LitElement {
  static styles = css`
    .menu {
      position: relative;
      display: inline-block;
    }

    .avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f44336;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: white;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      right: 0;
      width: 150px;
      border-radius: 4px;
    }

    .menu:hover .dropdown-content,
    .menu:focus-within .dropdown-content {
      display: block;
    }

    .menu-item {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      cursor: pointer;
    }

    .menu-item:hover {
      background-color: #f1f1f1;
    }

    .menu-item:focus {
      background-color: #ddd;
    }
  `;

  _logoutHandler() {
    this.dispatchEvent(
      new CustomEvent('logout-success', { bubbles: true, composed: true }),
    );
  }

  _showUserDetails() {
    this.dispatchEvent(
      new CustomEvent('show-user-details', { bubbles: true, composed: true }),
    );
  }

  static _handleKeydown(event, callback) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }

  render() {
    return html`
      <div class="menu">
        <div
          class="avatar"
          tabindex="0"
          @click=${this._showUserDetails}
          @keydown=${event =>
            UserMenuComponent._handleKeydown(event, this._showUserDetails)}
        >
          U
        </div>
        <div class="dropdown-content">
          <div
            class="menu-item"
            tabindex="0"
            @click=${this._showUserDetails}
            @keydown=${event =>
              UserMenuComponent._handleKeydown(event, this._showUserDetails)}
          >
            User Details
          </div>
          <div
            class="menu-item"
            tabindex="0"
            @click=${this._logoutHandler}
            @keydown=${event =>
              UserMenuComponent._handleKeydown(event, this._logoutHandler)}
          >
            Logout
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('user-menu-component', UserMenuComponent);
