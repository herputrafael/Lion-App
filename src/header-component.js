import { LitElement, html, css } from 'lit';
import './user/user-menu-component.js'; // Import the UserMenuComponent

class HeaderComponent extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
    userInitials: { type: String },
  };

  static styles = css`
    header {
      background-color: #1a2b42;
      color: white;
      padding: 0rem 1rem;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;

  render() {
    return html`
      <header>
        <h1>Welcome to Lion App</h1>
        ${this.isLoggedIn
          ? html`
              <user-menu-component
                @logout-success=${this._logoutHandler}
                .userInitials=${this.userInitials}
              >
              </user-menu-component>
            `
          : null}
      </header>
    `;
  }

  _logoutHandler() {
    this.dispatchEvent(
      new CustomEvent('logout-success', { bubbles: true, composed: true }),
    );
  }
}

customElements.define('header-component', HeaderComponent);
