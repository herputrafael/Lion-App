import { LitElement, html, css } from 'lit';

class HeaderComponent extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
  };

  static styles = css`
    header {
      background-color: #1a2b42;
      color: white;
      padding: 1rem;
      text-align: center;
      display: block;
      justify-content: space-between;
      align-items: center;
    }

    button {
      background-color: #f44336;
      border: none;
      color: white;
      padding: 10px 20px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
  `;

  _logoutHandler() {
    this.dispatchEvent(
      new CustomEvent('logout-success', { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <header>
        <h1>Welcome to Lion App</h1>
        ${this.isLoggedIn
          ? html`<button @click=${this._logoutHandler}>Logout</button>`
          : null}
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
