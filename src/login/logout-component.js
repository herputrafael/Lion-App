import { LitElement, html } from 'lit';
import '@lion/ui/define/lion-button.js';

class LogoutComponent extends LitElement {
  _logoutHandler() {
    this.dispatchEvent(
      new CustomEvent('logout-success', { bubbles: true, composed: true }),
    );

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  render() {
    return html`
      <lion-button @click=${this._logoutHandler}>Logout</lion-button>
    `;
  }
}

customElements.define('logout-component', LogoutComponent);
